//
//  Records+CoreDataProperties.swift
//  Vooler
//
//  Created by Dieu Vu on 11/30/22.
//
//

import Foundation
import CoreData


extension Records {

    @nonobjc public class func fetchRequest() -> NSFetchRequest<Records> {
        return NSFetchRequest<Records>(entityName: "Records")
    }

    @NSManaged public var recordDate: String?
    @NSManaged public var stepCount: Int64

}

extension Records : Identifiable {

}
