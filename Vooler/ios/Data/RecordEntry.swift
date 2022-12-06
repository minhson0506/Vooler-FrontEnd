//
//  RecordEntry.swift
//  Vooler
//
//  Created by Dieu Vu on 12/1/22.
//

import Foundation

struct RecordEntry: Codable, Equatable {
  var stepCount: Int
  var recordDate: String
  var posted: Bool
}


struct RecordDataDTO: Codable {
  var stepCount: Int
  var recordDate: String
}

