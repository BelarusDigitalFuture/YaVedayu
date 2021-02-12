//
//  MapViewController.swift
//  vedayu-ios
//
//  Created by Mikita on 10.02.21.
//

import UIKit
import Firebase
import SVProgressHUD
import YandexMapKit

class MapViewController: UIViewController  {
    
    @IBOutlet private weak var mapView: YMKMapView!
    
    var selectedObject: Object?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        setupMapView()
    }
    
    private func setupMapView() {
        mapView.mapWindow.map.move(
            with: YMKCameraPosition.init(target: YMKPoint(latitude: 53.905827, longitude: 27.560007), zoom: 15, azimuth: 0, tilt: 0),
            animationType: YMKAnimation(type: YMKAnimationType.smooth, duration: 3),
            cameraCallback: nil)
    }
    
    @IBAction func cameraAction(_ sender: Any) {
        performSegue(withIdentifier: "camera", sender: self)
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if let cameraVC = segue.destination as? CameraViewController {
            cameraVC.delegate = self
        }
        
        if let articleVC = segue.destination as? ArticleViewController {
            articleVC.object = selectedObject
        }
    }
    
    func performImageRecognition(_ image: UIImage) {
        let vision = Vision.vision()
        let options = VisionCloudTextRecognizerOptions()
        options.languageHints = ["ru", "be"]
        let textRecognizer = vision.cloudTextRecognizer(options: options)
        
        let visionImage = VisionImage(image: image)
        
        textRecognizer.process(visionImage) { result, error in
            guard error == nil, let text = result?.text else {
                self.showRecognitionError()
                SVProgressHUD.dismiss()
                return
            }
            
            let normalizedText = text.replacingOccurrences(of: "\n", with: "").replacingOccurrences(of: " ", with: "")
            print("recognized text: \(normalizedText)")
            self.processRecognizedText(normalizedText)
        }
    }
    
    func processRecognizedText(_ text: String) {
        StreetsService.shared.recognize(text: text) { (object, error) in
            SVProgressHUD.dismiss()
            if let object = object {
                self.selectedObject = object
                self.performSegue(withIdentifier: "article", sender: self)
            } else {
                self.showRecognitionError()
            }
        }
    }
    
    func showRecognitionError() {
        let alertController = UIAlertController(title: "Увы", message: "Не удалось распознать фото", preferredStyle: .alert)
        alertController.addAction(.init(title: "Ладно", style: .default, handler: nil))
        present(alertController, animated: true, completion: nil)
    }
    
}

extension MapViewController: CameraViewControllerDelegate {
    
    func didPickedImage(image: UIImage) {
        dismiss(animated: true, completion: {
            SVProgressHUD.show()
            self.performImageRecognition(image)
        })
        
    }
    
    
}
