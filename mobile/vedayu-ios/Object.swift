//
//  Object.swift
//  vedayu-ios
//
//  Created by Mikita on 11.02.21.
//

import Foundation

struct Object: Decodable {
    let i: Int
    let type: String
    let name: String
    let content: String
    let images: [ObjectImage]?
}

struct ObjectImage: Decodable {
    let url: String
}
