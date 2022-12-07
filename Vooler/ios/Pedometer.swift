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
  
  
  // ======================== MAIN BACKGROUND TASKS =========================

  private let activityManager = CMMotionActivityManager()
  private let pedometer: CMPedometer = CMPedometer()
  
  private var steps: Int?
  
  private var isPedometerAvailable: Bool {
             return CMPedometer.isPedometerEventTrackingAvailable() && CMPedometer.isDistanceAvailable() && CMPedometer.isStepCountingAvailable()
         }
  
  
  // Function to query the pedometer data accumulated in a day
  private func initializePedometer () {
    let timeInterval = Int(calculatePedometerQueryTime()) * -1
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
  
  // Function to handle background tasks of getting pedometer data and post to backend, to be triggered in background
  @objc
  func runPedometerBackgroundTasks(_ resolve:RCTPromiseResolveBlock, reject:RCTPromiseRejectBlock){
    initializePedometer()

    // make sure the user logged in and has a token
    print("token", UserDefaults.standard.string(forKey: "token"))
    if (UserDefaults.standard.string(forKey: "token") == nil){
      let error = NSError(domain: "authentication", code: 200, userInfo: nil);
      reject("ERROR_AUTH", "cannot get token", error);
    } else {
//      print("TOKEN: \(UserDefaults.standard.string(forKey: "token")!)")
      // Post records saved in JSON
      print("start to post")
      postQueuedRecords()
    }
    
    if (self.steps == nil){
      let error = NSError(domain: "pedometer", code: 200, userInfo: nil);
      reject("ERROR_STEPCOUNT", "cannot get step count", error);
    }
    else {
      // handle new record
      var recordArrayFromFile = self.readLocalFile(forName: "recordData")
      var newRecord = createRecordDataObject(stepCount: self.steps, timestamp: Date())
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
          
          // Check if the latest record in JSON file has the same date as the new record. If yes, overwrite the latest with the newer data of the day. Else, append the new record to json file and write to file
          var hadSameDayRecord = false
          if (recordArrayFromFile.count > 0){
            let lastestRecordDate = self.convertDateStringToDate(dateString: recordArrayFromFile.last!.recordDate)
            hadSameDayRecord = Calendar.current.isDate(lastestRecordDate, equalTo: self.convertDateStringToDate(dateString: newRecord.recordDate), toGranularity: .day)
          } else {
            hadSameDayRecord = false
          }

          if (hadSameDayRecord){
            //overwrite the latest with the newer data of the day
            recordArrayFromFile.indices.last.map {recordArrayFromFile[$0] = newRecord}
            //            recordArrayFromFile = [] // uncomment this and run to clear the json file
            let jsonStr = self.convertRecordEntryToJson(records: recordArrayFromFile)
            self.saveJsonDataToFile(jsonString: jsonStr)
            print("updated record in json: \(jsonStr)")
          } else {
            //append the new record to json file and write to file
            recordArrayFromFile.append(newRecord)
            //          recordArrayFromFile = [] // uncomment this and run to clear the json file
            let jsonStr = self.convertRecordEntryToJson(records: recordArrayFromFile)
            self.saveJsonDataToFile(jsonString: jsonStr)
            print("add new day record in json: \(jsonStr)")
          }
        }
      }
      let jsonDataAfterUpdate = readLocalFile(forName: "recordData") //this line is for testing only
      resolve("savedJsonData from file: \((jsonDataAfterUpdate.last == nil) ? "empty" : "step: \(jsonDataAfterUpdate.last!.stepCount), date: \(jsonDataAfterUpdate.last!.recordDate)").\n ");
    }
  }
  
  
  // Method to check and post the old unposted records in local JSON:
  private func postQueuedRecords(){
    var recordArrayFromFile = readLocalFile(forName: "recordData")
    for record in recordArrayFromFile {
      networkService.postRecords(record: record){ result in
        switch result {
        case .success:
          recordArrayFromFile = recordArrayFromFile.filter({ $0 != record})
        case .failure (let error):
          print("error posting record (\(record.recordDate), \(record.stepCount)) :\(error.localizedDescription)")
        }
      }
    }
    let jsonStr = self.convertRecordEntryToJson(records: recordArrayFromFile)
    self.saveJsonDataToFile(jsonString: jsonStr)
    print("updated record in json: \(jsonStr)")
  }
  
  
  // Method to transfer token from RN and save to userDefaults
  @objc
  func getToken(_ token: String) -> String{
    let defaults = UserDefaults.standard
    defaults.set(token, forKey: "token")
    print("token input", token)
    return token
  }

  
  // ======================== MISC, TO REVIEW =========================

  // Test function, to remove if not use at the end
  private var count = 0;
  @objc
  func test(_ callback: RCTResponseSenderBlock){
    count+=1;
    callback([count])
  }
  
  // Test function, to remove if not use at the end
  @objc
  func backgroundTasks(_ callback: RCTResponseSenderBlock) {
    callback(["hello from background task"]);
  }
  
  
 // ======================== ULTILITIES =========================
  
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
//        print("Path: \(FileManager.default.urls(for: .documentDirectory, in: .userDomainMask))")
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
    let diffTimeInSeconds = currentTime.timeIntervalSinceReferenceDate - startOfDay.timeIntervalSinceReferenceDate
    return diffTimeInSeconds
  }
  
  private func convertDateStringToDate (dateString: String) -> Date {
    let dateFormatter = DateFormatter()
    dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
    dateFormatter.locale = Locale(identifier: "fi_FI")
    dateFormatter.timeZone = TimeZone(identifier: "Europe/Helsinki")
    if let date = dateFormatter.date(from: dateString){
      return (date)
    }
    return Date()
  }
  
  
  // ======================== SETUP FOR OBJC =========================

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false;
  }
  
  
  @objc
  func constantToExport() -> [String: Any]!{
    return ["stepCount": self.steps!]
  }
  
}




