//
//  AppDelegate.swift
//  vedayu-ios
//
//  Created by Mikita on 10.02.21.
//

import UIKit
import Firebase
import YandexMapKit

@main
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        FirebaseApp.configure()
        YMKMapKit.setApiKey("")
        return true
    }

}

