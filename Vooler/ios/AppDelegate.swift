//
//  AppDelegate.swift
//  Vooler
//
//  Created by Dieu Vu on 11/30/22.
//

import UIKit
import BackgroundTasks

@available(iOS 14.0, *)
class AppDelegate:  UIResponder, UIApplicationDelegate  {
  let logger = Logger(subsystem: "vooler", category: "backgroundTask")
  func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
    // Register a background task launch handler to execute whenever the system decides to run a
        // background tasks with our registered task identifier
    BGTaskScheduler.shared.register(forTaskWithIdentifier: "com.vooler.ios-module.task", using: DispatchQueue.global()){ task in
      self.logger.log("[BGTASK] Perform bg processing ")
      task.setTaskCompleted(success: true)
      self.scheduleBackgroundProcessing()
    }
  }
  
  func scheduleBackgroundProcessing(){
    let request = BGProcessingTaskRequest(identifier: "com.vooler.ios-module.task");
    request.requiresNetworkConnectivity = true
    request.earliestBeginDate = Date(timeIntervalSinceNow: 0.5 * 60)
    do {
      try BGTaskScheduler.shared.submit(request)
    }
    catch {
      print("failed to process in background \(error)")
    }
  }
  
  func applicationDidEnterBackground(_ application: UIApplication) {
    self.logger.info("App did enter background")
        self.scheduleBackgroundProcessing()
      
  }
}



