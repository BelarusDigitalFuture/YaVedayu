//
//  ArticleViewController.swift
//  vedayu-ios
//
//  Created by Mikita on 11.02.21.
//

import UIKit
import SDWebImage

class ArticleViewController: UIViewController {
    
    var object: Object?
    
    @IBOutlet weak var nameLabel: UILabel!
    @IBOutlet weak var cityNameLabel: UILabel!
    @IBOutlet weak var infoLabel: UILabel!
    @IBOutlet weak var imageView: UIImageView!
    @IBOutlet weak var stackView: UIStackView!
    @IBOutlet weak var scrollView: UIScrollView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        stackView.layoutMargins = UIEdgeInsets(top: 13, left: 19, bottom: 0, right: 19)
        stackView.isLayoutMarginsRelativeArrangement = true
        
        nameLabel.text = object?.name
        cityNameLabel.text = "Минск"
        infoLabel.text = object?.content ?? "К сожалению, мы еще не добавили информацию об этой улице"
        
        if let imageUrlString = object?.images?.first?.url,
           let url = URL(string: imageUrlString) {
            imageView.sd_setImage(with: url, completed: nil)
        } else {
            imageView.isHidden = true
        }
    
    }
    


}
