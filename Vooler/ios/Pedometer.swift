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
  
  private let activityManager = CMMotionActivityManager()
  private let pedometer: CMPedometer = CMPedometer()
  
  private var steps: Int?
  
//  private var isPedometerAvailable: Bool {
//             return CMPedometer.isPedometerEventTrackingAvailable() && CMPedometer.isDistanceAvailable() && CMPedometer.isStepCountingAvailable()
//         }
  
//  @objc
//  func initializePedometer () {
//    if isPedometerAvailable {
//      guard let startDate = Calendar.current.date(byAdding: .day, value: -7, to: Date())
//      else {return}
//      pedometer.queryPedometerData(from: startDate, to: Date()){
//        (data, error) in
//        guard let data = data, error == nil else {return}
//        self.steps = data.numberOfSteps.intValue
//      }
//    }
//  }
//  
  
  private var count = 0;
  @objc
  func test(_ callback: RCTResponseSenderBlock){
    count+=1;
//    print(count);
    callback([count])
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true;
  }
  
  @objc
  func constantToExport() -> [AnyHashable: Any]!{
    return ["stepCount": steps!]
  }
  
  
}

