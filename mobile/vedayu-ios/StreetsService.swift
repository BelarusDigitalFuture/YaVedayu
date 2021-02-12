//
//  BackendService.swift
//  vedayu-ios
//
//  Created by Mikita on 11.02.21.
//

import Foundation
import Alamofire



class StreetsService {
    static let shared = StreetsService()
    let baseUrl = "http://ec2-3-139-239-182.us-east-2.compute.amazonaws.com:3000/api/v1/search"
    
    func recognize(text: String,  completion: @escaping (Object?, Error?) -> ()) {
        
        let parameters: Parameters = [
            "search": text
        ]
        
        AF.request(
                baseUrl,
                method: .get,
                parameters: parameters,
                encoding: URLEncoding.default,
                headers: nil).responseDecodable(of: [Object].self) { (response) in
                    guard let objects = response.value,
                          let object = objects.first else { return }
                    completion(object, nil)
                  }
    }
}
