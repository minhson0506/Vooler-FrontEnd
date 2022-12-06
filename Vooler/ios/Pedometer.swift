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
  
  
  // Function to query the pedometer data accumulated in a day
  private func initializePedometer () {
    var timeInterval = Int(calculatePedometerQueryTime()) * -1
    print("time interval \(timeInterval)")
    if isPedometerAvailable {
      guard let startDate = Calendar.current.date(byAdding: .second, value: timeInterval, to: Date())
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
  
  // TODO: Refactor this function
  @objc
  func getSteps(_ resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock){
    initializePedometer();

    print("lastSuccessfulPost timestamp \(UserDefaults.standard.string(forKey: "lastSuccessfulPost")!)")
    if (self.steps == nil){
      let error = NSError(domain: "", code: 200, userInfo: nil);
      reject("ERROR_STEPCOUNT", "cannot get step count", error);
    }
    else {
      var recordArrayFromFile = readLocalFile(forName: "recordData")
      var newRecord = createRecordDataObject(stepCount: self.steps, timestamp: Date())
      // try parsing
      networkService.postRecords(record: newRecord){ result in
        switch result {
        case .success:
          print("Post succeeded")
          newRecord.posted = true
          UserDefaults.standard.set(newRecord.recordDate, forKey: "lastSuccessfulPost" )
          print("lastSuccessfulPost timestamp \(UserDefaults.standard.string(forKey: "lastSuccessfulPost")!)")
        case .failure(let error):
          print("error posting \(error.localizedDescription)")
          print("lastSuccessfulPost timestamp \(UserDefaults.standard.string(forKey: "lastSuccessfulPost")!)")
          newRecord.posted = false
          recordArrayFromFile.append(newRecord) // uncomment this and run to clear the json file
//        recordArrayFromFile = [] // uncomment this and run to clear the json file
          let jsonStr = self.convertRecordEntryToJson(records: recordArrayFromFile)
          self.saveJsonDataToFile(jsonString: jsonStr)
          print("test record: \(jsonStr)")
        }
      }
      
      var jsonDataAfterAppending = readLocalFile(forName: "recordData") //this line is for testing only
      resolve("savedJsonData from file: \(jsonDataAfterAppending.last)");
    }
  }
  
  // Method to transfer token from RN and save to userDefaults
  @objc
  func getToken(_ token: String) -> String{
    print("token in native module: \(token)")
    let defaults = UserDefaults.standard
    defaults.set(token, forKey: "token")
//    let tokenInUD = defaults.string(forKey: "token")
//    print("token in user default: \(tokenInUD!)")
    return token
  }

  
  // TODO: function to handle background task (get pedometer data and save to json if network not available)
  @objc
  func backgroundTasks(_ callback: RCTResponseSenderBlock) {
    callback(["hello from background task"]);
  }
  
  
  private func createRecordDataObject(stepCount: Int?, timestamp: Date) -> RecordEntry {
    let dateFormatter = DateFormatter()
    dateFormatter.dateFormat = "YYYY-MM-dd HH:mm:ss"
    var record = RecordEntry(stepCount:0, recordDate: dateFormatter.string(from:Date()), posted: false)
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
  
  private func readLocalFile(forName name: String) -> [RecordEntry] {
      do {
       let fileURL = FileManager.default.urls(for: .documentDirectory,
                                                       in: .userDomainMask).first!.appendingPathComponent("recordData")
        if let jsonData = try String(contentsOf: fileURL).data(using: .utf8){
            print("read path: \(fileURL)")
            print("json data  in file \(jsonData)")
            let decoder = JSONDecoder()
          let records = try decoder.decode([RecordEntry].self, from: jsonData)
            return records
          }
      } catch {
        print(error.localizedDescription)
        return []
      }
      return []
  }
  
  // Function to calculate the time to query the pedometer data since the beginning of the current day to the current time
  private func calculatePedometerQueryTime () -> TimeInterval {
    let currentTime = Date()
    let startOfDay = Calendar.current.startOfDay(for: Date())
    var diffTimeInSeconds = currentTime.timeIntervalSinceReferenceDate - startOfDay.timeIntervalSinceReferenceDate
    return diffTimeInSeconds
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




