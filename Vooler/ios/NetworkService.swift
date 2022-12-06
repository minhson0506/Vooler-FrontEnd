//
//  NetworkService.swift
//  Vooler
//
//  Created by Dieu Vu on 11/30/22.
//

import Foundation
import os
import Reachability

enum CustomError: Error {
    case invalidPostData
    case invalidToken
    case cannotProcessData
    case custom(errorMessage: String)
}

struct PostRecordResponse: Codable {
//  {
//      "status": "updated",
//      "saved_timestamp": "2022-12-06T09:54:34.026Z",
//      "uid": 28,
//      "record_date": "2022-11-27 11:12:01"
//  }
  let status: String
  let saved_timestamp: String
  let uid: Int
  let record_date: String
}

class NetworkService {
  
  let baseUrl = "https://www.vooler.biz/"
  
  // Check network availability
  func checkNetworkConnection() -> Bool{
    let reachability = try! Reachability()

    reachability.whenReachable = { reachability in
        if reachability.connection == .wifi {
            print("Reachable via WiFi")
        } else {
            print("Reachable via Cellular")
        }
    }
    reachability.whenUnreachable = { _ in
        print("Not reachable")
    }

    do {
        try reachability.startNotifier()
    } catch {
        print("Unable to start notifier")
    }
    return reachability.connection != .unavailable;
  }
  
  
  // Function to handle post record action
  func postRecords(record: RecordEntry, completion: @escaping (Result<Bool, CustomError>) -> Void) {
    guard let url = URL(string: "\(baseUrl)record") else {
      completion(.failure(.custom(errorMessage: "URL incorrect")))
      return
    }
    
    let body = RecordDataDTO(stepCount: record.stepCount, recordDate: record.recordDate)
    print("req body \(body)")
    let encodedBody = try? JSONEncoder().encode(body)
    print("encoded body \(String(data: encodedBody!, encoding: .utf8)!)")
    
    let token = UserDefaults.standard.string(forKey: "token")
      

    var request = URLRequest(url: url)
    
    request.httpMethod = "POST"
    request.addValue("application/json", forHTTPHeaderField: "Content-Type")
    request.httpBody = try? JSONEncoder().encode(body)
    request.setValue( "Bearer \(token!)", forHTTPHeaderField: "Authorization")
    
    print("req auth token: \(request.value(forHTTPHeaderField: "Authorization")!)")

      URLSession.shared.dataTask(with: request) { (data, response, error) in
        guard let data = data, error == nil else {
          completion(.failure(.custom(errorMessage: "No data")))
          return
        }
        
        guard let postRecordResponse = try? JSONDecoder().decode(PostRecordResponse.self, from: data) else {
          completion(.failure(.custom(errorMessage: "cannot parse response data")))
          return
        }
        
        print("postRecordResponse \(postRecordResponse)")
        // save timestamp of the last successful post to userdefaults
        UserDefaults.standard.set(postRecordResponse.record_date, forKey: "lastSuccessfulPost" )
        
        completion(.success(true))
      }
      .resume()
    
  }

}
