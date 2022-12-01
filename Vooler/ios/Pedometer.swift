//
//  Pedometer.swift
//  Vooler
//
//  Created by Dieu Vu on 11/27/22.
//

// TODO:
// - create data class of record DONE
// - add create record method
// - add post method with token from RN. Use event emitter when submit logins and save token to userDefaults
// - add schedule to run task in background -> handled in RN with package react-native-background-fetch
// - if no network save unposted data to core data


import Foundation
import CoreMotion

@objc(Pedometer)
class Pedometer: NSObject {
  let networkService = NetworkService()
  override init() {
    super.init();
    initializePedometer();
    networkService.checkNetworkConnection();
  }
  
  private let activityManager = CMMotionActivityManager()
  private let pedometer: CMPedometer = CMPedometer()
  
  private var steps: Int?
  
  private var isPedometerAvailable: Bool {
             return CMPedometer.isPedometerEventTrackingAvailable() && CMPedometer.isDistanceAvailable() && CMPedometer.isStepCountingAvailable()
         }
  
  private func initializePedometer () {
    if isPedometerAvailable {
      guard let startDate = Calendar.current.date(byAdding: .day, value: -1, to: Date())
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
  
  
  // This is example func
  @objc
  func getSteps(_ resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock){
    // Seem that the function is called here when the app starts on foreground, we can see the log only when calling it here
//    networkService.checkNetworkConnection();
//    print("network service \(networkService)");
    
    if (self.steps == nil){
      let error = NSError(domain: "", code: 200, userInfo: nil);
      reject("ERROR_STEPCOUNT", "cannot get step count", error);
    }
    else {
      resolve("step count is \(self.steps!)");
    }
  }
  
  // TODO: add a method to transfer token from RN and save to userDefaults
  @objc
  func getToken(){
    
  }
  
  
  // TODO: function to handle background task (get pedometer data and save to coredata if network not available)
  //expose to ObjC
  @objc
  func backgroundTasks(_ callback: RCTResponseSenderBlock) {
    callback(["hello from background task"]);
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



