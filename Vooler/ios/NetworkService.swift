//
//  NetworkService.swift
//  Vooler
//
//  Created by Dieu Vu on 11/30/22.
//

import Foundation
import os
import Reachability

class NetworkService {
  
  let baseUrl = "https://www.vooler.biz"
  
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
  
  
  // TODO: function to handle post record action
  func postRecords(){
    
    
  }
}
