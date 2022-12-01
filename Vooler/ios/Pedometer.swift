//
//  Pedometer.swift
//  Vooler
//
//  Created by Dieu Vu on 11/27/22.
//

// TODO:
// - if no network save unposted data to json file
// - store the last time post successfully to userdefaults
// - add post method with token from RN. Use event emitter when submit logins and save token to userDefaults
// - create data class of record DONE
// - add create record method DONE
// - add schedule to run task in background -> handled in RN with package react-native-background-fetch Test DONE


import Foundation
import CoreMotion
import CoreData

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
  
  
  // This is example func
  @objc
  func getSteps(_ resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock){
    if (self.steps == nil){
      let error = NSError(domain: "", code: 200, userInfo: nil);
      reject("ERROR_STEPCOUNT", "cannot get step count", error);
    }
    else {
      let record = createRecordDataObject(stepCount: self.steps, timestamp: Date())
      let jsonStr = convertRecordEntryToJson(records: [record])
      saveJsonDataToFile(jsonString: jsonStr)
      let readJsonData = readLocalFile(forName: "recordData")
      resolve("test record: \(jsonStr), savedJsonData from file: \(readJsonData)");
    }
  }
  
  // TODO: add a method to transfer token from RN and save to userDefaults
  @objc
  func getToken(){
    
  }
  
  
  // TODO: function to handle background task (get pedometer data and save to json if network not available)
  @objc
  func backgroundTasks(_ callback: RCTResponseSenderBlock) {
    callback(["hello from background task"]);
  }
  
  
  private func createRecordDataObject(stepCount: Int?, timestamp: Date) -> RecordEntry {
    let dateFormatter = DateFormatter()
    dateFormatter.dateFormat = "YYYY-MM-dd HH:mm:ss"
    var record = RecordEntry(stepCount:0, recordDate: dateFormatter.string(from:Date()))
    record.stepCount = (stepCount != nil) ? stepCount! : 0
    record.recordDate = dateFormatter.string(from: timestamp)
    return record
  }
  
  
  private func convertRecordEntryToJson (records: [RecordEntry]) -> String {
    let encoder = JSONEncoder()
    do {
        let encodedRecord = try encoder.encode(records)
        let jsonString = String(data: encodedRecord, encoding: .utf8)!
        return (jsonString)
    } catch {
      print(error.localizedDescription)
      return "error"
    }
  }
  
  private func saveJsonDataToFile (jsonString: String){
    if let jsonData = jsonString.data(using: .utf8),
        let documentDirectory = FileManager.default.urls(for: .documentDirectory,
                                                         in: .userDomainMask).first {
        let pathWithFileName = documentDirectory.appendingPathComponent("recordData")
        do {
            try jsonData.write(to: pathWithFileName)
        print("Path: \(FileManager.default.urls(for: .documentDirectory, in: .userDomainMask))")
          print("saved to file")
        } catch {
            print("error saving file")
        }
    }
  }
  
  private func readLocalFile(forName name: String) -> Data? {
      do {
       let bundlePath = FileManager.default.urls(for: .documentDirectory,
                                                       in: .userDomainMask).first!.appendingPathComponent("recordData")
        if let jsonData = try String(contentsOf: bundlePath).data(using: .utf8){
            print("read path: \(bundlePath)")
            print("json data  in file \(jsonData)")
              return jsonData
          }
      } catch {
          print(error)
      }
      
      return nil
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




