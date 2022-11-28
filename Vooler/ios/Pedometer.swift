//
//  Pedometer.swift
//  Vooler
//
//  Created by Dieu Vu on 11/27/22.
//

import Foundation
import CoreMotion

@objc(Pedometer)
class Pedometer: NSObject {
  
  override init() {
    super.init();
    initializePedometer();
  }
  
  private let activityManager = CMMotionActivityManager()
  private let pedometer: CMPedometer = CMPedometer()
  
  private var steps: Int?
  
  private var isPedometerAvailable: Bool {
             return CMPedometer.isPedometerEventTrackingAvailable() && CMPedometer.isDistanceAvailable() && CMPedometer.isStepCountingAvailable()
         }
  
  private func initializePedometer () {
    if isPedometerAvailable {
      guard let startDate = Calendar.current.date(byAdding: .hour, value: -1, to: Date())
      else {return}
      pedometer.queryPedometerData(from: startDate, to: Date()){
        (data, error) in
        guard let data = data, error == nil else {return}
        self.steps = data.numberOfSteps.intValue
        print("steps in ios \(self.steps!)");
      }
    }
  }
  
  private var count = 0;
  @objc
  func test(_ callback: RCTResponseSenderBlock){
    count+=1;
    callback([count])
  }
  
  @objc
  func getSteps(_ resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock){
    if (self.steps == nil){
      let error = NSError(domain: "", code: 200, userInfo: nil);
      reject("ERROR_STEPCOUNT", "cannot get step count", error);
    }
    else {
      resolve("step count is \(String(describing: self.steps))");
    }
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false;
  }
  
  
  @objc
  func constantToExport() -> [String: Any]!{
    return ["stepCount": self.steps!]
  }
  

}

