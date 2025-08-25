"use client"

import { useState } from "react"

type RCHolder = {
  slNo: number
  indentSlNo: number
  item: string
  dosage: string
  packSize: string
  l1Rate: string
  bidder: string
}

const rcHolders: RCHolder[] = [
  { slNo: 1, indentSlNo: 1, item: "Acetazolamide", dosage: "Tablet 250 mg", packSize: "(1x10) x10 tabs", l1Rate: "1.37", bidder: "Medipol" },
  { slNo: 2, indentSlNo: 3, item: "Adrenaline", dosage: "Injection 1mg/ml 1ml. ampoule", packSize: "ampoule", l1Rate: "2.92", bidder: "HIMALAYA MEDITEK PVT LTD" },
  { slNo: 3, indentSlNo: 4, item: "Albendazole", dosage: "Oral liquid 200 mg/5ml", packSize: "10 ml bottle", l1Rate: "4.7", bidder: "REVAT LABORATORIES PRIVATE LIMITED" },
  { slNo: 4, indentSlNo: 5, item: "Albendazole", dosage: "Tablet 400mg", packSize: "(1x10) x10 tabs", l1Rate: "1.6", bidder: "Healers" },
  { slNo: 5, indentSlNo: 6, item: "Allopurinol", dosage: "Tablet 100mg", packSize: "(1x10) x10 tabs", l1Rate: "0.68", bidder: "CMG Biotech" },
  { slNo: 6, indentSlNo: 7, item: "Allopurinol", dosage: "Tablet 300mg", packSize: "(1x10) x10 tabs", l1Rate: "1.89", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 7, indentSlNo: 8, item: "Amiodarone", dosage: "Tablet 100 mg", packSize: "(1x10) x10 tabs", l1Rate: "1.84", bidder: "MASCOT HEALTH SERIES PVT LTD" },
  { slNo: 8, indentSlNo: 9, item: "Amiodarone", dosage: "Tablet 200 mg", packSize: "(1x10) x10 tabs", l1Rate: "3.19", bidder: "MASCOT HEALTH SERIES PVT LTD" },
  { slNo: 9, indentSlNo: 10, item: "Amitriptyline", dosage: "Tablet 25 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.24", bidder: "MASCOT HEALTH SERIES PVT LTD" },
  { slNo: 10, indentSlNo: 12, item: "Amlodipine", dosage: "Tablet 2.5 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.17", bidder: "JACKSON LABORATORIES PVT LTD and CMG Biotech" },
  { slNo: 11, indentSlNo: 13, item: "Amlodipine", dosage: "Tablet 5 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.15", bidder: "NESTOR PHARMACEUTICALS LIMITED" },
  { slNo: 12, indentSlNo: 14, item: "Amoxicillin", dosage: "Capsule 250mg", packSize: "(1x10) x10 tabs", l1Rate: "0.98", bidder: "REVAT LABORATORIES PRIVATE LIMITED" },
  { slNo: 13, indentSlNo: 15, item: "Amoxicillin", dosage: "Capsule 500mg", packSize: "(1x10) x10 tabs", l1Rate: "1.67", bidder: "REVAT LABORATORIES PRIVATE LIMITED" },
  { slNo: 14, indentSlNo: 16, item: "Amoxicillin", dosage: "Oral liquid 250 mg/5ml", packSize: "30 ml Bottle", l1Rate: "9.69", bidder: "Ridley Life Science Pvt. Ltd" },
  { slNo: 15, indentSlNo: 17, item: "Amoxicillin (A) + Clavulanic acid (B)", dosage: "Dry Syrup 125 mg (A) + 31.25 mg (B)/5ml", packSize: "30 ml Bottle", l1Rate: "22.18", bidder: "BHARAT PARENTERALS LIMITED" },
  { slNo: 16, indentSlNo: 18, item: "Amoxicillin (A) + Clavulanic acid (B)", dosage: "Powder for Injection 1 g (A) + 200 mg (B)", packSize: "vial with diluent", l1Rate: "32.42", bidder: "Pushkar Pharma" },
  { slNo: 17, indentSlNo: 19, item: "Amoxicillin (A) + Clavulanic acid (B)", dosage: "Tablet 500 mg (A) + 125 mg (B)", packSize: "(1x10) x10 tabs", l1Rate: "5.26", bidder: "Macleods Pharmaceuticals Limited" },
  { slNo: 18, indentSlNo: 20, item: "Ampicillin", dosage: "Powder for Injection 1 g", packSize: "vial with diluent", l1Rate: "10.7", bidder: "Pushkar Pharma" },
  { slNo: 19, indentSlNo: 21, item: "Ampicillin", dosage: "Powder for Injection 500 mg", packSize: "vial with diluent", l1Rate: "6.55", bidder: "BHARAT PARENTERALS LIMITED" },
  { slNo: 20, indentSlNo: 23, item: "Anti-rabies immunoglobulin", dosage: "5ml/vial 20 vials/box, Equine Rabies Immunoglobulin 1500 IU / 5 ml", packSize: "vial with diluent", l1Rate: "141.47", bidder: "VINS BIOPRODUCTS LIMITED" },
  { slNo: 21, indentSlNo: 25, item: "Ascorbic acid (Vitamin C)", dosage: "Tablet 100 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.39", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 22, indentSlNo: 26, item: "Ascorbic acid (Vitamin C)", dosage: "Tablet 500 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.88", bidder: "REVAT LABORATORIES PRIVATE LIMITED" },
  { slNo: 23, indentSlNo: 27, item: "Atenolol", dosage: "Tablet 100 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.34", bidder: "MASCOT HEALTH SERIES PVT LTD" },
  { slNo: 24, indentSlNo: 28, item: "Atenolol", dosage: "Tablet 50 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.21", bidder: "CMG Biotech" },
  { slNo: 25, indentSlNo: 29, item: "Atorvastatin", dosage: "Tablet 10 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.29", bidder: "NESTOR PHARMACEUTICALS LIMITED" },
  { slNo: 26, indentSlNo: 30, item: "Atorvastatin", dosage: "Tablet 20 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.52", bidder: "NESTOR PHARMACEUTICALS LIMITED" },
  { slNo: 27, indentSlNo: 32, item: "Atropine", dosage: "Injection 0.6mg/ml 1 ml. ample.", packSize: "1ml ampoule", l1Rate: "2.78", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 28, indentSlNo: 33, item: "Azithromycin", dosage: "Oral liquid 200 mg/5ml.", packSize: "15 ml bottle", l1Rate: "12.49", bidder: "MASCOT HEALTH SERIES PVT LTD" },
  { slNo: 29, indentSlNo: 35, item: "Azithromycin", dosage: "Tablet 250mg.", packSize: "(1x10) x10 tabs", l1Rate: "4.48", bidder: "Cipla" },
  { slNo: 30, indentSlNo: 36, item: "Azithromycin", dosage: "Tablet 500mg.", packSize: "(1x10) x10 tabs", l1Rate: "8.85", bidder: "REVAT LABORATORIES PRIVATE LIMITED" },
  { slNo: 31, indentSlNo: 39, item: "Benzoyl peroxide", dosage: "Gel 2.5%", packSize: "20 gm tube", l1Rate: "8.6", bidder: "Ridley Life Science Pvt. Ltd" },
{ slNo: 32, indentSlNo: 41, item: "Betamethasone", dosage: "Cream 0.05%", packSize: "20 gm tube", l1Rate: "6.03", bidder: "Zenith drugs Pvt. Ltd." },
{ slNo: 33, indentSlNo: 42, item: "Betamethasone", dosage: "Injection 4 mg/ml in 2ml. vial.", packSize: "vial with diluent", l1Rate: "4.52", bidder: "HIMALAYA MEDITEK PVT LTD" },
{ slNo: 34, indentSlNo: 44, item: "Bisacodyl", dosage: "Tablet 5 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.27", bidder: "La Chemico" },
{ slNo: 35, indentSlNo: 52, item: "Calamine", dosage: "Lotion (As per IP)", packSize: "100 ml bottle", l1Rate: "20.16", bidder: "Medipol" },
{ slNo: 36, indentSlNo: 52, item: "Calamine", dosage: "Lotion (As per IP)", packSize: "50 ml bottle", l1Rate: "12.56", bidder: "Medipol" },
{ slNo: 37, indentSlNo: 53, item: "Calcium carbonate", dosage: "Tablet 250 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.27", bidder: "Ridley Life Science Pvt. Ltd" },
{ slNo: 38, indentSlNo: 54, item: "Calcium carbonate", dosage: "Tablet 500 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.24", bidder: "REVAT LABORATORIES PRIVATE LIMITED" },
{ slNo: 39, indentSlNo: 62, item: "Carbimazole", dosage: "Tablet 10 mg", packSize: "(1x10) x10 tabs", l1Rate: "2.02", bidder: "Macleods Pharmaceuticals Limited" },
{ slNo: 40, indentSlNo: 63, item: "Carbimazole", dosage: "Tablet 5 mg", packSize: "(1x10) x10 tabs", l1Rate: "1.34", bidder: "Macleods Pharmaceuticals Limited" },
{ slNo: 41, indentSlNo: 64, item: "Carboxymethylcellulose", dosage: "Eye Drops 0.5%", packSize: "5 ml", l1Rate: "5.54", bidder: "Pushkar Pharma" },
{ slNo: 42, indentSlNo: 65, item: "Cefadroxil", dosage: "Oral liquid 125 mg/5ml", packSize: "30 ml bottle", l1Rate: "12.32", bidder: "JACKSON LABORATORIES PVT LTD" },
{ slNo: 43, indentSlNo: 66, item: "Cefadroxil", dosage: "Tablet 1g", packSize: "(1x10) x10 tabs", l1Rate: "7.95", bidder: "Ridley Life Science Pvt. Ltd" },
{ slNo: 44, indentSlNo: 67, item: "Cefadroxil", dosage: "Tablet 500mg.", packSize: "(1x10) x10 tabs", l1Rate: "3.58", bidder: "JACKSON LABORATORIES PVT LTD" },
{ slNo: 45, indentSlNo: 70, item: "Cefixime", dosage: "Oral liquid 100 mg/5 ml", packSize: "30 ml bottle", l1Rate: "16.24", bidder: "MASCOT HEALTH SERIES PVT LTD" },
{ slNo: 46, indentSlNo: 71, item: "Cefixime", dosage: "Tablet 200 mg.", packSize: "(1x10) x10 tabs", l1Rate: "3.02", bidder: "REVAT LABORATORIES PRIVATE LIMITED" },
{ slNo: 47, indentSlNo: 72, item: "Cefixime", dosage: "Tablet 400 mg.", packSize: "(1x10) x10 tabs", l1Rate: "6.04", bidder: "REVAT LABORATORIES PRIVATE LIMITED" },
{ slNo: 48, indentSlNo: 73, item: "Cefotaxime", dosage: "Powder for Injection 1 g with diluant", packSize: "vial", l1Rate: "17.14", bidder: "BHARAT PARENTERALS LIMITED" },
{ slNo: 49, indentSlNo: 74, item: "Cefotaxime", dosage: "Powder for Injection 250 mg. with diluant", packSize: "vial", l1Rate: "8.16", bidder: "Sai Parental" },
{ slNo: 50, indentSlNo: 75, item: "Cefotaxime", dosage: "Powder for Injection 500 mg with diluant", packSize: "vial", l1Rate: "11.2", bidder: "MMG" },
{ slNo: 51, indentSlNo: 76, item: "Ceftazidime", dosage: "Powder for Injection 1 g", packSize: "vial", l1Rate: "34.1", bidder: "Pushkar Pharma" },
{ slNo: 52, indentSlNo: 77, item: "Ceftazidime", dosage: "Powder for Injection 250 mg with diluant", packSize: "vial", l1Rate: "12.82", bidder: "Pushkar Pharma" },
{ slNo: 53, indentSlNo: 78, item: "Ceftriaxone", dosage: "Powder for Injection 1 gm with diluant", packSize: "vial", l1Rate: "17.64", bidder: "BHARAT PARENTERALS LIMITED" },
{ slNo: 54, indentSlNo: 79, item: "Ceftriaxone", dosage: "Powder for Injection 2 gm with diluant", packSize: "vial", l1Rate: "32.27", bidder: "HIMALAYA MEDITEK PVT LTD" },
{ slNo: 55, indentSlNo: 80, item: "Ceftriaxone", dosage: "Powder for Injection 250 mg with diluant", packSize: "vial", l1Rate: "8.38", bidder: "Sai Parental" },
{ slNo: 56, indentSlNo: 81, item: "Ceftriaxone", dosage: "Powder for Injection 500 mg", packSize: "vial with diluent", l1Rate: "11.38", bidder: "Sai Parental" },
{ slNo: 57, indentSlNo: 82, item: "Cetirizine", dosage: "Oral liquid 5 mg/5ml", packSize: "30 ml bottle", l1Rate: "0.19", bidder: "EMBIOTIC LABORATORIES PVT LTD" },
{ slNo: 58, indentSlNo: 83, item: "Cetirizine", dosage: "Tablet 10mg.", packSize: "(1x10) x10 tabs", l1Rate: "0.1", bidder: "JOHNSON AND SMITH CO" },
{ slNo: 59, indentSlNo: 84, item: "Cetrimide", dosage: "Solution 20% (Concentrate for dilution)", packSize: "75 ml bottle", l1Rate: "27.44", bidder: "JOHNSON AND SMITH CO" },
{ slNo: 60, indentSlNo: 85, item: "Chloroquine", dosage: "Oral liquid 50 mg/5 ml", packSize: "60 ml bottle", l1Rate: "5.49", bidder: "REVAT LABORATORIES PRIVATE LIMITED" },
{ slNo: 61, indentSlNo: 87, item: "Chlorpheniramine", dosage: "Oral liquid 2 mg/5ml", packSize: "30 ml bottle", l1Rate: "5.49", bidder: "REVAT LABORATORIES PRIVATE LIMITED" },
{ slNo: 62, indentSlNo: 88, item: "Chlorpheniramine", dosage: "Tablet 4mg.", packSize: "(1x10) x10 tabs", l1Rate: "0.1", bidder: "JOHNSON AND SMITH CO" },
{ slNo: 63, indentSlNo: 89, item: "Cholecalciferol", dosage: "Oral liquid 400 IU/ml", packSize: "30 ml bottle", l1Rate: "14.56", bidder: "Ridley Life Science Pvt. Ltd" },
{ slNo: 64, indentSlNo: 90, item: "Cholecalciferol", dosage: "Tablet 1000 IU,", packSize: "(1x10) x10 tabs", l1Rate: "0.63", bidder: "Ridley Life Science Pvt. Ltd" },
{ slNo: 65, indentSlNo: 91, item: "Cholecalciferol", dosage: "Tablet 60000 IU", packSize: "(1x10) x10 tabs", l1Rate: "1.49", bidder: "Ridley Life Science Pvt. Ltd" },
{ slNo: 66, indentSlNo: 92, item: "Ciprofloxacin", dosage: "Drops 0.3 % eye and ear drop.", packSize: "10 ml bottle/ Drop", l1Rate: "4.98", bidder: "Pushkar Pharma" },
{ slNo: 67, indentSlNo: 95, item: "Ciprofloxacin", dosage: "Tablet 250mg.", packSize: "(1x10) x10 tabs", l1Rate: "1", bidder: "REVAT LABORATORIES PRIVATE LIMITED" },
{ slNo: 68, indentSlNo: 96, item: "Ciprofloxacin", dosage: "Tablet 500mg.", packSize: "(1x10) x10 tabs", l1Rate: "1.82", bidder: "REVAT LABORATORIES PRIVATE LIMITED" },
{ slNo: 69, indentSlNo: 97, item: "Clarithromycin", dosage: "Oral liquid 125mg/5ml", packSize: "30 ml bottle", l1Rate: "21.32", bidder: "Ridley Life Science Pvt. Ltd" },
{ slNo: 70, indentSlNo: 98, item: "Clarithromycin", dosage: "Tablet 250mg.", packSize: "(1x10) x10 tabs", l1Rate: "4.93", bidder: "Healers" },
{ slNo: 71, indentSlNo: 99, item: "Clarithromycin", dosage: "Tablet 500 mg.", packSize: "(1x10) x10 tabs", l1Rate: "9.22", bidder: "Medipol" },
{ slNo: 72, indentSlNo: 100, item: "Clindamycin", dosage: "Capsule 150 mg", packSize: "(1x10) x10 tabs", l1Rate: "3.64", bidder: "JACKSON LABORATORIES PVT LTD" },
{ slNo: 73, indentSlNo: 101, item: "Clindamycin", dosage: "Capsule 300 mg", packSize: "(1x10) x10 tabs", l1Rate: "5.33", bidder: "Wallace" },
{ slNo: 74, indentSlNo: 102, item: "Clobazam", dosage: "Tablet 10mg", packSize: "(1x10) x10 tabs", l1Rate: "1.75", bidder: "CMG Biotech" },
{ slNo: 75, indentSlNo: 103, item: "Clobazam", dosage: "Tablet 5 mg", packSize: "(1x10) x10 tabs", l1Rate: "1.12", bidder: "CMG Biotech" },
{ slNo: 76, indentSlNo: 105, item: "Clonazepam", dosage: "Tablet 0.5 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.49", bidder: "CMG Biotech" },
{ slNo: 77, indentSlNo: 106, item: "Clopidogrel", dosage: "Tablet 75 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.64", bidder: "NESTOR PHARMACEUTICALS LIMITED" },
{ slNo: 78, indentSlNo: 107, item: "Clotrimazole", dosage: "Cream 1%", packSize: "15 gm tube", l1Rate: "5.92", bidder: "Zenith drugs Pvt. Ltd." },
{ slNo: 79, indentSlNo: 108, item: "Clotrimazole", dosage: "Drops 1% ear drop.", packSize: "10 ml bottle/ Drop", l1Rate: "8.34", bidder: "Pushkar Pharma" },
{ slNo: 80, indentSlNo: 109, item: "Clotrimazole", dosage: "Pessary 100 mg", packSize: "(1x10)x 10 tabs", l1Rate: "1.51", bidder: "Ridley Life Science Pvt. Ltd" },

  { slNo: 82, indentSlNo: 111, item: "Co-trimoxazole [Sulphamethoxazole (A)+Trimethoprim(B)]", dosage: "Oral liquid 200 mg (A) + 40 mg (B)/5ml.", packSize: "60 ml bottle", l1Rate: "9.07", bidder: "REVAT LABORATORIES PRIVATE LIMITED" },
  { slNo: 83, indentSlNo: 112, item: "Co-trimoxazole [Sulphamethoxazole (A)+Trimethoprim(B)]", dosage: "Tablet 400 mg (A) + 80 mg (B)", packSize: "(1x10) x10 tabs", l1Rate: "0.71", bidder: "Anglo French" },
  { slNo: 84, indentSlNo: 113, item: "Co-trimoxazole [Sulphamethoxazole (A)+Trimethoprim(B)]", dosage: "Tablet 800 mg (A) + 160 mg (B)", packSize: "(1x10) x10 tabs", l1Rate: "1.37", bidder: "REVAT LABORATORIES PRIVATE LIMITED" },
  { slNo: 85, indentSlNo: 117, item: "Deflazacort", dosage: "12mg tab.", packSize: "(1x10) x10 tabs", l1Rate: "1.6", bidder: "HIMALAYA MEDITEK PVT LTD" },
  { slNo: 86, indentSlNo: 118, item: "Deflazacort", dosage: "6mg tab.", packSize: "(1x10) x10 tabs", l1Rate: "0.9", bidder: "MASCOT HEALTH SERIES PVT LTD" },
  { slNo: 87, indentSlNo: 119, item: "Dexamethasone", dosage: "Injection 4mg/ml in 2 ml. vial.", packSize: "Vial/ampoule", l1Rate: "4.31", bidder: "YELURI FORMULATIONS PRIVATE LIMITED" },
  { slNo: 88, indentSlNo: 120, item: "Dexamethasone", dosage: "Tablet 0.5mg.", packSize: "(1x10) x10 tabs", l1Rate: "0.26", bidder: "RELIEF BIOTECH PVT LTD" },
  { slNo: 89, indentSlNo: 123, item: "Diazepam", dosage: "Tablet 5 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.36", bidder: "La Chemico" },
  { slNo: 90, indentSlNo: 124, item: "Diclofenac", dosage: "Injection 25mg/ml 3ml ample", packSize: "ampoule", l1Rate: "1.92", bidder: "HIMALAYA MEDITEK PVT LTD" },
  { slNo: 91, indentSlNo: 125, item: "Diclofenac", dosage: "Tab.SR 100mg.", packSize: "(1x10) x10 tabs", l1Rate: "0.34", bidder: "Ridley Life Science Pvt. Ltd" },
  { slNo: 92, indentSlNo: 126, item: "Diclofenac", dosage: "Tablet 50mg ;", packSize: "(1x10) x10 tabs", l1Rate: "0.21", bidder: "JOHNSON AND SMITH CO" },
  { slNo: 93, indentSlNo: 127, item: "Dicloxacillin", dosage: "Capsule 250 mg.", packSize: "(1x10) x10 tabs", l1Rate: "1.69", bidder: "Ridley Life Science Pvt. Ltd" },
  { slNo: 94, indentSlNo: 128, item: "Dicloxacillin", dosage: "Capsule 500 mg.", packSize: "(1x10) x10 tabs", l1Rate: "3.15", bidder: "Ridley Life Science Pvt. Ltd" },
  { slNo: 95, indentSlNo: 131, item: "Dicyclomine", dosage: "Injection 10 mg/ml in 2ml. ample.", packSize: "ampoule", l1Rate: "1.75", bidder: "HIMALAYA MEDITEK PVT LTD" },
  { slNo: 96, indentSlNo: 133, item: "Dicyclomine", dosage: "Tablet 10 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.13", bidder: "La Chemico" },
  { slNo: 97, indentSlNo: 134, item: "Diethylcarbamazine", dosage: "Tablet 100mg", packSize: "(1x10) x10 tabs", l1Rate: "0.3", bidder: "Ridley Life Science Pvt. Ltd" },
  { slNo: 98, indentSlNo: 135, item: "Diethylcarbamazine", dosage: "Tablet 50mg.", packSize: "(1x10) x10 tabs", l1Rate: "0.25", bidder: "Ridley Life Science Pvt. Ltd" },
  { slNo: 99, indentSlNo: 136, item: "Digoxin", dosage: "Tablet 0.25 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.56", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 100, indentSlNo: 139, item: "Diltiazem", dosage: "Tablet 30 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.73", bidder: "CMG Biotech" },
  { slNo: 101, indentSlNo: 142, item: "Domperidone", dosage: "Oral liquid 1 mg/ml. 30ml. phail", packSize: "30 ml bottle", l1Rate: "5.26", bidder: "REVAT LABORATORIES PRIVATE LIMITED" },
  { slNo: 102, indentSlNo: 143, item: "Domperidone", dosage: "Tablet 10 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.15", bidder: "JOHNSON AND SMITH CO" },
  { slNo: 103, indentSlNo: 144, item: "Doxycycline", dosage: "Capsule 100mg.", packSize: "(1x10) x10 tabs", l1Rate: "1.12", bidder: "CMG Biotech" },
  { slNo: 104, indentSlNo: 147, item: "Drotaverine", dosage: "Tab.40mg", packSize: "(1x10) x10 tabs", l1Rate: "0.54", bidder: "MASCOT HEALTH SERIES PVT LTD" },
  { slNo: 105, indentSlNo: 148, item: "Enalapril", dosage: "Tablet 2.5 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.31", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 106, indentSlNo: 149, item: "Enalapril", dosage: "Tablet 5 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.4", bidder: "CMG Biotech" },
  { slNo: 107, indentSlNo: 151, item: "Escitalopram", dosage: "Tablet 10 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.76", bidder: "Medipol" },
  { slNo: 108, indentSlNo: 152, item: "Escitalopram", dosage: "Tablet 5 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.48", bidder: "Medipol" },
  { slNo: 109, indentSlNo: 154, item: "Fluconazole", dosage: "Oral liquid 50 mg/5 ml", packSize: "30 ml bottle", l1Rate: "15.14", bidder: "Ridley Life Science Pvt. Ltd" },
  { slNo: 110, indentSlNo: 155, item: "Fluconazole", dosage: "Tablet 150mg.", packSize: "(1x10) x10 tabs", l1Rate: "1.57", bidder: "Ridley Life Science Pvt. Ltd" },
  { slNo: 111, indentSlNo: 158, item: "Fluoxetine", dosage: "Capsule 20 mg", packSize: "(1x10) x10 Capsule", l1Rate: "0.48", bidder: "Super Formulations Pvt. Ltd." },
  { slNo: 112, indentSlNo: 160, item: "Fluphenazine", dosage: "Depot Injection 25 mg/ml", packSize: "1 ml ampoule", l1Rate: "21.28", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 113, indentSlNo: 161, item: "Folic acid", dosage: "Tablet 5 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.17", bidder: "NESTOR PHARMACEUTICALS LIMITED" },
  { slNo: 114, indentSlNo: 163, item: "Furosemide", dosage: "Injection 10 mg/ ml in 2ml-ample", packSize: "ampoule", l1Rate: "2.02", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 115, indentSlNo: 164, item: "Furosemide", dosage: "Tablet 40 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.34", bidder: "NESTOR PHARMACEUTICALS LIMITED" },
  { slNo: 116, indentSlNo: 165, item: "Fusidic acid", dosage: "Cream 2% + Mometasone 0.1%", packSize: "10 gm tube", l1Rate: "30.28", bidder: "Ridley Life Science Pvt. Ltd" },
  { slNo: 117, indentSlNo: 168, item: "Gentamicin", dosage: "Injection 40mg/ml in 2ml. vial", packSize: "2 ml ampoule", l1Rate: "4.31", bidder: "YELURI FORMULATIONS PRIVATE LIMITED" },
  { slNo: 118, indentSlNo: 169, item: "Glimepiride", dosage: "Tablet 1 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.21", bidder: "MASCOT HEALTH SERIES PVT LTD and HIMALAYA MEDITEK PVT LTD" },
  { slNo: 119, indentSlNo: 170, item: "Glimepiride", dosage: "Tablet 2 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.18", bidder: "NESTOR PHARMACEUTICALS LIMITED" },
  { slNo: 120, indentSlNo: 171, item: "Glucose", dosage: "Injection 10%", packSize: "500 ml FFS", l1Rate: "20.22", bidder: "Aculife Healthcare Private Limited" },
  { slNo: 121, indentSlNo: 172, item: "Glucose", dosage: "Injection 5%", packSize: "500 ml FFS", l1Rate: "16.41", bidder: "M/s Haseeb Pharmaceuticals Pvt Ltd" },
  { slNo: 122, indentSlNo: 174, item: "Glucose (A) + Sodium chloride(B)", dosage: "Injection 5% (A) + 0.9% (B)", packSize: "500 ml FFS", l1Rate: "16.41", bidder: "M/s Haseeb Pharmaceuticals Pvt Ltd" },
  { slNo: 123, indentSlNo: 175, item: "Glycerin", dosage: "Oral Liquid", packSize: "30 ml bottle", l1Rate: "13.44", bidder: "JOHNSON AND SMITH CO" },
  { slNo: 124, indentSlNo: 175, item: "Glycerin", dosage: "Oral Liquid", packSize: "60 ml bottle", l1Rate: "20.16", bidder: "JOHNSON AND SMITH CO" },
  { slNo: 125, indentSlNo: 175, item: "Glycerin", dosage: "Oral Liquid", packSize: "100 ml bottle", l1Rate: "24.64", bidder: "JOHNSON AND SMITH CO" },
  { slNo: 126, indentSlNo: 175, item: "Glycerin", dosage: "Oral Liquid", packSize: "500 ml bottle", l1Rate: "78.4", bidder: "JOHNSON AND SMITH CO" },
  { slNo: 127, indentSlNo: 177, item: "Griseofulvin", dosage: "Tablet 125mg.", packSize: "(1x10) x10 tabs", l1Rate: "1.38", bidder: "NESTOR PHARMACEUTICALS LIMITED" },
  { slNo: 128, indentSlNo: 178, item: "Griseofulvin", dosage: "Tablet 250mg.", packSize: "(1x10) x10 tabs", l1Rate: "2.5", bidder: "NESTOR PHARMACEUTICALS LIMITED" },
  { slNo: 129, indentSlNo: 179, item: "Haloperidol", dosage: "Tablet 10 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.72", bidder: "Shine Pharmaceuticals Limited" },
  { slNo: 130, indentSlNo: 180, item: "Haloperidol", dosage: "Tablet 5 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.45", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 131, indentSlNo: 181, item: "Homatropine", dosage: "Drops 2%", packSize: "10 ml bottle/ Drop", l1Rate: "17.33", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 132, indentSlNo: 182, item: "Hydrochlorothiazide", dosage: "Tablet 12.5 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.37", bidder: "CMG Biotech" },
  { slNo: 133, indentSlNo: 183, item: "Hydrochlorothiazide", dosage: "Tablet 25 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.48", bidder: "CMG Biotech" },
  { slNo: 134, indentSlNo: 184, item: "Hydrocortisone", dosage: "Injection 100 mg in 1ml .vail", packSize: "1 ml ampoule", l1Rate: "11.14", bidder: "Pushkar Pharma" },
  { slNo: 135, indentSlNo: 185, item: "Hydrocortisone", dosage: "Injection 200 mg in 2ml. vial.", packSize: "1ml ampoule", l1Rate: "18.98", bidder: "Pushkar Pharma" },
  { slNo: 136, indentSlNo: 189, item: "Hyoscine butylbromide", dosage: "Injection 20 mg/ml 1ml ample.", packSize: "1 ml ampoule", l1Rate: "7.62", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 137, indentSlNo: 190, item: "Hyoscine butylbromide", dosage: "Tablet 10 mg", packSize: "(1x10) x10 tabs", l1Rate: "2.18", bidder: "Ridley Life Science Pvt. Ltd" },
  { slNo: 138, indentSlNo: 191, item: "Ibuprofen", dosage: "Oral liquid 100 mg/5ml", packSize: "60 ml bottle", l1Rate: "8.65", bidder: "NESTOR PHARMACEUTICALS LIMITED" },
  { slNo: 139, indentSlNo: 192, item: "Ibuprofen", dosage: "Tablet 200mg.", packSize: "(1x10) x10 tabs", l1Rate: "0.33", bidder: "ABBOTT INDIA LIMITED" },
  { slNo: 140, indentSlNo: 193, item: "Ibuprofen", dosage: "Tablet 400mg.", packSize: "(1x10) x10 tabs", l1Rate: "0.61", bidder: "ABBOTT INDIA LIMITED" },
  { slNo: 141, indentSlNo: 195, item: "Imipramine", dosage: "Tab. 25mg.", packSize: "(1x10) x10 tabs", l1Rate: "0.39", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 142, indentSlNo: 199, item: "Isosorbide dinitrate", dosage: "Tablet 10 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.26", bidder: "Medipol" },
  { slNo: 143, indentSlNo: 200, item: "Isosorbide dinitrate", dosage: "Tablet 5 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.2", bidder: "NESTOR PHARMACEUTICALS LIMITED" },
  { slNo: 144, indentSlNo: 203, item: "Ketamine", dosage: "Injection 10mg/ml ;", packSize: "30 ml Vial", l1Rate: "68.25", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 145, indentSlNo: 206, item: "Levo thyroxine", dosage: "Tablet 50 mcg", packSize: "100 tab bottle", l1Rate: "0.34", bidder: "Macleods Pharmaceuticals Limited" },
  { slNo: 146, indentSlNo: 207, item: "Levofloxacin", dosage: "Tablet 250mg.", packSize: "(1x10) x10 tabs", l1Rate: "1.34", bidder: "Macleods Pharmaceuticals Limited and REVAT LABORATORIES PRIVATE LIMITED" },
  { slNo: 147, indentSlNo: 208, item: "Levofloxacin", dosage: "Tablet 500mg.", packSize: "(1x10) x10 tabs", l1Rate: "2.13", bidder: "Macleods Pharmaceuticals Limited" },
  { slNo: 148, indentSlNo: 211, item: "Lignocaine", dosage: "Injection2% in vial .", packSize: "30 ml vial", l1Rate: "8.29", bidder: "NESTOR PHARMACEUTICALS LIMITED" },
  { slNo: 149, indentSlNo: 214, item: "Linezolid", dosage: "Tablet 600mg", packSize: "(1x10) x10 tabs", l1Rate: "7.67", bidder: "MASCOT HEALTH SERIES PVT LTD" },
  { slNo: 150, indentSlNo: 215, item: "Lorazepam", dosage: "Injection 2mg/ml in 1 ml. ample.", packSize: "1 ml ampoule", l1Rate: "4.98", bidder: "Pushkar Pharma" },
  { slNo: 151, indentSlNo: 216, item: "Lorazepam", dosage: "Tablet 1mg.", packSize: "(1x10) x10 tabs", l1Rate: "0.52", bidder: "Shine Pharmaceuticals Limited" },
  { slNo: 152, indentSlNo: 217, item: "Lorazepam", dosage: "Tablet 2mg.", packSize: "(1x10) x10 tabs", l1Rate: "0.9", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 153, indentSlNo: 221, item: "Mebendazole", dosage: "Oral liquid 100 mg/5ml", packSize: "30 ml bottle", l1Rate: "9.52", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 154, indentSlNo: 222, item: "Mebendazole", dosage: "Tablet 100mg.", packSize: "(1x6)x10", l1Rate: "0.44", bidder: "NESTOR PHARMACEUTICALS LIMITED" },
  { slNo: 155, indentSlNo: 223, item: "Mecobalamin", dosage: "Inj. 500µgm/ml. 1ml. ample.", packSize: "1 ml ampoule", l1Rate: "3.2", bidder: "Pushkar Pharma" },
  { slNo: 156, indentSlNo: 224, item: "Mecobalamin", dosage: "Tab. 500µgm", packSize: "(1x10) x10 tabs", l1Rate: "0.58", bidder: "EMBIOTIC LABORATORIES PVT LTD, Synokem and Medipol" },
  { slNo: 157, indentSlNo: 225, item: "Mefenamic acid", dosage: "Capsule 250mg.", packSize: "(1x10)x10 capsule", l1Rate: "0.76", bidder: "Medipol" },
  { slNo: 158, indentSlNo: 226, item: "Mefenamic acid", dosage: "Capsule 500 mg.", packSize: "(1x10)x10 capsule", l1Rate: "1.06", bidder: "Medipol" },
  { slNo: 159, indentSlNo: 227, item: "Mefenamic acid", dosage: "Oral liquid 100 mg/5ml", packSize: "30 ml bottle", l1Rate: "6.05", bidder: "Medipol" },
  { slNo: 160, indentSlNo: 229, item: "Metformin", dosage: "Tablet 1000 mg. (Immediate and controlled release)", packSize: "(1x10)x10 tabs", l1Rate: "0.48", bidder: "Ridley Life Science Pvt. Ltd" },
  { slNo: 161, indentSlNo: 230, item: "Metformin", dosage: "Tablet 500 mg.(Immediate and controlled release)", packSize: "(1x10)x10 tabs", l1Rate: "0.34", bidder: "RELIEF BIOTECH PVT LTD" },
  { slNo: 162, indentSlNo: 231, item: "Methotrexate", dosage: "Tablet 2.5 mg", packSize: "(1x10)x10 tabs", l1Rate: "1.01", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 163, indentSlNo: 233, item: "Methyl prednisolone", dosage: "Tablet 16 mg", packSize: "(1x10)x10 tabs", l1Rate: "3.2", bidder: "HIMALAYA MEDITEK PVT LTD" },
  { slNo: 164, indentSlNo: 234, item: "Methyl prednisolone", dosage: "Tablet 8 mg", packSize: "(1x10)x10 tabs", l1Rate: "1.46", bidder: "RELIEF BIOTECH PVT LTD" },
  { slNo: 165, indentSlNo: 235, item: "Methyldopa", dosage: "Tablet 250 mg.", packSize: "(1x10)x10 tabs", l1Rate: "3.92", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 166, indentSlNo: 237, item: "Methylergometrine", dosage: "Injection 0.2 mg/ml in 1ml. ample.", packSize: "ampoule", l1Rate: "4.42", bidder: "Pushkar Pharma" },
  { slNo: 167, indentSlNo: 238, item: "Methylergometrine", dosage: "Tablet 0.125 mg", packSize: "(1x10)x10 tabs", l1Rate: "0.67", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 168, indentSlNo: 240, item: "Metoclopramide", dosage: "Injection 5 mg/ml in 2ml. ample.", packSize: "2 ml ampoule", l1Rate: "1.96", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 169, indentSlNo: 241, item: "Metoclopramide", dosage: "Oral liquid 5 mg/5 ml", packSize: "30 ml bottle", l1Rate: "6.61", bidder: "Medipol" },
  { slNo: 170, indentSlNo: 242, item: "Metoclopramide", dosage: "Tablet 10 mg", packSize: "(1x10)x10 tabs", l1Rate: "0.26", bidder: "Medipol" },
  { slNo: 171, indentSlNo: 244, item: "Metoprolol", dosage: "Tablet 25 mg", packSize: "(1x10)x10 tabs", l1Rate: "0.36", bidder: "CMG Biotech" },
  { slNo: 172, indentSlNo: 245, item: "Metoprolol", dosage: "Tablet 50 mg", packSize: "(1x10)x10 tabs", l1Rate: "0.48", bidder: "CMG Biotech and Medipol" },
  { slNo: 173, indentSlNo: 246, item: "Metronidazole", dosage: "Injection 500 mg/100ml in vial", packSize: "100 ml FFS", l1Rate: "10.49", bidder: "PENTAGON LABS LTD" },
  { slNo: 174, indentSlNo: 247, item: "Metronidazole", dosage: "Oral liquid 200 mg/5 ml.", packSize: "30 ml bottle", l1Rate: "8.48", bidder: "Ridley Life Science Pvt. Ltd" },
  { slNo: 175, indentSlNo: 248, item: "Metronidazole", dosage: "Tablet 200mg.", packSize: "(1x10)x10 tabs", l1Rate: "0.36", bidder: "NESTOR PHARMACEUTICALS LIMITED" },
  { slNo: 176, indentSlNo: 249, item: "Metronidazole", dosage: "Tablet 400mg.", packSize: "(1x10)x10 tabs", l1Rate: "0.67", bidder: "REVAT LABORATORIES PRIVATE LIMITED" },
  { slNo: 177, indentSlNo: 251, item: "Moxifloxacin", dosage: "Tablet 200mg.", packSize: "(1x10)x10 tabs", l1Rate: "5.49", bidder: "Ridley Life Science Pvt. Ltd" },
  { slNo: 178, indentSlNo: 252, item: "Moxifloxacin", dosage: "Tablet 400mg", packSize: "(1x10)x10 tabs", l1Rate: "10.53", bidder: "Ridley Life Science Pvt. Ltd" },
  { slNo: 179, indentSlNo: 253, item: "N-acetylcysteine", dosage: "Injection 200mg/ml  5ml. ampoule", packSize: "ampoule", l1Rate: "28", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 180, indentSlNo: 257, item: "Neostigmine", dosage: "Injection 0.5mg/ml  in 1ml. ample.", packSize: "ampoule", l1Rate: "3.36", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 181, indentSlNo: 258, item: "Nifedipine", dosage: "Tablet 10 mg", packSize: "(1x10)x10 tabs", l1Rate: "0.54", bidder: "MASCOT HEALTH SERIES PVT LTD" },
  { slNo: 182, indentSlNo: 260, item: "Nitrofurantoin", dosage: "Tablet 100mg.", packSize: "(1x10)x10 tabs", l1Rate: "1.34", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 183, indentSlNo: 266, item: "Omeprazole", dosage: "Capsule 10 mg", packSize: "(1x10)x10 tabs", l1Rate: "0.39", bidder: "Ridley Life Science Pvt. Ltd" },
  { slNo: 184, indentSlNo: 267, item: "Omeprazole", dosage: "Capsule 20 mg", packSize: "(1x10)x10 tabs", l1Rate: "0.38", bidder: "Super Formulations Pvt. Ltd." },
  { slNo: 185, indentSlNo: 268, item: "Omeprazole", dosage: "Capsule 40 mg", packSize: "(1x10)x10 tabs", l1Rate: "0.67", bidder: "Ridley Life Science Pvt. Ltd" },
  { slNo: 186, indentSlNo: 269, item: "Ondansetron", dosage: "Tablet 4 mg", packSize: "(1x10)x10 tabs", l1Rate: "0.2", bidder: "NESTOR PHARMACEUTICALS LIMITED" },
  { slNo: 187, indentSlNo: 270, item: "Ornidazole", dosage: "500mg. tab.", packSize: "(1x10)x10 tabs", l1Rate: "0.99", bidder: "Medipol" },
  { slNo: 188, indentSlNo: 273, item: "Oxytocin", dosage: "Injection 10 IU/ml in 1ml. ample.", packSize: "ampoule", l1Rate: "6.66", bidder: "Pushkar Pharma" },
  { slNo: 189, indentSlNo: 274, item: "Oxytocin", dosage: "Injection 5 IU/ml in 1ml. Ample.", packSize: "ampoule", l1Rate: "5.54", bidder: "Pushkar Pharma" },
  { slNo: 190, indentSlNo: 275, item: "Pantoprazole", dosage: "40mg Tab .", packSize: "(1x10)x10 tabs", l1Rate: "0.61", bidder: "MASCOT HEALTH SERIES PVT LTD" },
  { slNo: 191, indentSlNo: 276, item: "Pantoprazole", dosage: "Injection 40 mg", packSize: "10 ml ampoule", l1Rate: "6.66", bidder: "Pushkar Pharma" },
  { slNo: 192, indentSlNo: 277, item: "Paracetamol", dosage: "Oral liquid dosage form  125 mg / 5ml", packSize: "60 ml bottle", l1Rate: "6.82", bidder: "Zenith drugs Pvt. Ltd." },
  { slNo: 193, indentSlNo: 278, item: "Paracetamol", dosage: "drop 100mg/ml.", packSize: "15 ml bottle", l1Rate: "7.06", bidder: "Medipol" },
  { slNo: 194, indentSlNo: 279, item: "Paracetamol", dosage: "Injection 150mg/ml 2ml.ample.", packSize: "ampoule", l1Rate: "2.66", bidder: "HIMALAYA MEDITEK PVT LTD" },
  { slNo: 195, indentSlNo: 280, item: "Paracetamol", dosage: "Tablet 500 mg", packSize: "(1x10)x10 tabs", l1Rate: "0.39", bidder: "REVAT LABORATORIES PRIVATE LIMITED and HEALERS LAB" },
  { slNo: 196, indentSlNo: 281, item: "Permethrin", dosage: "Cream 5%", packSize: "15 gm tube", l1Rate: "8.12", bidder: "MASCOT HEALTH SERIES PVT LTD" },
  { slNo: 197, indentSlNo: 282, item: "Permethrin", dosage: "Lotion 1%", packSize: "60 ml bottle", l1Rate: "9.86", bidder: "Medipol" },
  { slNo: 198, indentSlNo: 282, item: "Permethrin", dosage: "Lotion 1%", packSize: "120 ml bottle", l1Rate: "15.68", bidder: "Medipol" },
  { slNo: 199, indentSlNo: 283, item: "Pheniramine", dosage: "Injection 22.75mg/ml 2ml. ample.", packSize: "2 ml ampoule", l1Rate: "2.03", bidder: "Medipol" },
  { slNo: 200, indentSlNo: 285, item: "Phenobarbitone", dosage: "Tablet 30 mg.", packSize: "(1x10)x10 tabs", l1Rate: "0.56", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 201, indentSlNo: 286, item: "Phenobarbitone", dosage: "Tablet 60 mg.", packSize: "(1x10)x10 tabs", l1Rate: "0.9", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 202, indentSlNo: 289, item: "Phenytoin", dosage: "Tablet 100mg.", packSize: "(1x10)x10 tabs", l1Rate: "0.39", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 203, indentSlNo: 290, item: "Phenytoin", dosage: "Tablet 50mg.", packSize: "(1x10)x10 tabs", l1Rate: "0.28", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 204, indentSlNo: 293, item: "Pilocarpine", dosage: "Drops 2%", packSize: "5ml bottle/drop", l1Rate: "50.4", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 205, indentSlNo: 296, item: "Potassium chloride", dosage: "Oral liquid 500 mg/5 ml", packSize: "60 ml bottle", l1Rate: "14.04", bidder: "Zenith drugs Pvt. Ltd." },
  { slNo: 206, indentSlNo: 297, item: "Povidone iodine", dosage: "Solution 5%", packSize: "50 ml bottle", l1Rate: "6.1", bidder: "Ridley Life Science Pvt. Ltd" },
  { slNo: 207, indentSlNo: 300, item: "Prednisolone", dosage: "Oral liquid 5 mg/5 ml", packSize: "30 ml bottle", l1Rate: "10.66", bidder: "Ridley Life Science Pvt. Ltd" },
  { slNo: 208, indentSlNo: 301, item: "Prednisolone", dosage: "Tablet 10mg", packSize: "(1x10)x10 tabs", l1Rate: "1.01", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 209, indentSlNo: 302, item: "Prednisolone", dosage: "Tablet 5mg.", packSize: "(1x10)x10 tabs", l1Rate: "0.46", bidder: "REVAT LABORATORIES PRIVATE LIMITED" },
  { slNo: 210, indentSlNo: 304, item: "Primaquine", dosage: "Tablet 15 mg", packSize: "(1x10)x10 tabs", l1Rate: "1.96", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 211, indentSlNo: 305, item: "Primaquine", dosage: "Tablet 7.5 mg", packSize: "(1x10)x10 tabs", l1Rate: "0.82", bidder: "BHARAT PARENTERALS LIMITED" },
  { slNo: 212, indentSlNo: 308, item: "Propranolol", dosage: "Tablet 40 mg", packSize: "(1x10)x10 tabs", l1Rate: "0.52", bidder: "Shine Pharmaceuticals Limited" },
  { slNo: 213, indentSlNo: 309, item: "Pyridoxine", dosage: "Tablet 100 mg", packSize: "(1x10)x10 tabs", l1Rate: "1.46", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 214, indentSlNo: 310, item: "Pyridoxine", dosage: "Tablet 50 mg", packSize: "(1x10)x10 tabs", l1Rate: "0.78", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 215, indentSlNo: 312, item: "Ramipril", dosage: "Tablet 2.5 mg", packSize: "(1x10)x10 tabs", l1Rate: "0.45", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 216, indentSlNo: 313, item: "Ramipril", dosage: "Tablet 5 mg", packSize: "(1x10)x10 tabs", l1Rate: "0.67", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 217, indentSlNo: 314, item: "Ranitidine", dosage: "Injection 25 mg/ml in 2ml. ample.", packSize: "2 ml ampoule", l1Rate: "1.81", bidder: "HIMALAYA MEDITEK PVT LTD" },
  { slNo: 218, indentSlNo: 315, item: "Ranitidine", dosage: "Oral liquid 75 mg/5 ml", packSize: "100 ml bottle", l1Rate: "14.06", bidder: "Ridley Life Science Pvt. Ltd" },
  { slNo: 219, indentSlNo: 316, item: "Ranitidine", dosage: "Tablet 150 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.39", bidder: "Ridley Life Science Pvt. Ltd" },
  { slNo: 220, indentSlNo: 317, item: "Riboflavin", dosage: "Tablet 5 mg", packSize: "(1x10)x10 tabs", l1Rate: "0.17", bidder: "Ridley Life Science Pvt. Ltd" },
  { slNo: 221, indentSlNo: 318, item: "Ringer lactate", dosage: "Injection (as per IP)", packSize: "500 ml FFS", l1Rate: "17.84", bidder: "Aculife Healthcare Private Limited" },
  { slNo: 222, indentSlNo: 319, item: "Risperidone", dosage: "Tablet 2 mg", packSize: "(1x10)x10 tabs", l1Rate: "0.39", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 223, indentSlNo: 320, item: "Risperidone", dosage: "Tablet 4 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.67", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 224, indentSlNo: 322, item: "Salbutamol", dosage: "Oral liquid 2 mg/5 ml", packSize: "100 ml bottle", l1Rate: "8.9", bidder: "REVAT LABORATORIES PRIVATE LIMITED" },
  { slNo: 225, indentSlNo: 324, item: "Salbutamol", dosage: "Tablet 2 mg", packSize: "(1x10)x10 tabs", l1Rate: "0.17", bidder: "JOHNSON AND SMITH CO" },
  { slNo: 226, indentSlNo: 325, item: "Salbutamol", dosage: "Tablet 4 mg", packSize: "(1x10)x10 tabs", l1Rate: "0.19", bidder: "JOHNSON AND SMITH CO" },
  { slNo: 227, indentSlNo: 326, item: "Salicylic acid", dosage: "Ointment 6%", packSize: "30 gm tube", l1Rate: "25.76", bidder: "Medipol" },
  { slNo: 228, indentSlNo: 327, item: "Silver sulphadiazine", dosage: "Cream 1%", packSize: "500 gm jar", l1Rate: "156.8", bidder: "Medipol" },
  { slNo: 229, indentSlNo: 328, item: "Snake venom antiserum Lyophilized polyvalent", dosage: "powder with diluant", packSize: "(10 ml Vial), Injection", l1Rate: "250.77", bidder: "bharat serum and vaccines ltd." },
  { slNo: 230, indentSlNo: 330, item: "Sodium chloride", dosage: "Injection 0.45%", packSize: "500 ml FFS", l1Rate: "20.75", bidder: "PENTAGON LABS LTD" },
  { slNo: 231, indentSlNo: 331, item: "Sodium chloride", dosage: "Injection 0.9%", packSize: "500 ml FFS", l1Rate: "14.5", bidder: "M/s Haseeb Pharmaceuticals Pvt Ltd" },
  { slNo: 232, indentSlNo: 332, item: "Sodium valproate", dosage: "Oral liquid 200 mg/5ml", packSize: "100 ml bottle", l1Rate: "19.99", bidder: "Ridley Life Science Pvt. Ltd" },
  { slNo: 233, indentSlNo: 333, item: "Sodium valproate", dosage: "Tablet 200mg.", packSize: "(1x10)x10 tabs", l1Rate: "0.76", bidder: "Medipol" },
  { slNo: 234, indentSlNo: 334, item: "Spironolactone", dosage: "Tablet 25 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.95", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 235, indentSlNo: 335, item: "Spironolactone", dosage: "Tablet 50 mg", packSize: "(1x10) x10 tabs", l1Rate: "1.79", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 236, indentSlNo: 336, item: "Telmisartan", dosage: "Tablet 20 mg", packSize: "(1x10)x10 tabs", l1Rate: "0.45", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 237, indentSlNo: 337, item: "Telmisartan", dosage: "Tablet 40 mg", packSize: "(1x10)x10 tabs", l1Rate: "0.63", bidder: "NESTOR PHARMACEUTICALS LIMITED" },
  { slNo: 238, indentSlNo: 338, item: "Terbinafine", dosage: "250mg tab.", packSize: "(1x10)x10 tabs", l1Rate: "2.65", bidder: "Ridley Life Science Pvt. Ltd" },
  { slNo: 239, indentSlNo: 341, item: "Thiamine", dosage: "Injection 100 mg/ml", packSize: "ampoule", l1Rate: "4.98", bidder: "Pushkar Pharma" },
  { slNo: 240, indentSlNo: 342, item: "Thiamine", dosage: "Tablet 100 mg", packSize: "(1x10) x10 tabs", l1Rate: "0.94", bidder: "synokem" },
  { slNo: 241, indentSlNo: 344, item: "Tinidazole", dosage: "Tab. 500mg", packSize: "(1x10)x10 tabs", l1Rate: "0.91", bidder: "Medipol" },
  { slNo: 242, indentSlNo: 345, item: "Tranexamic acid", dosage: "Injection 100 mg/ml in 5ml.ampoule", packSize: "5 ml ampoule", l1Rate: "13.23", bidder: "BHARAT PARENTERALS LIMITED" },
  { slNo: 243, indentSlNo: 346, item: "Tranexamic acid", dosage: "Tablet 500 mg", packSize: "(1x10)x10 tabs", l1Rate: "5.6", bidder: "JACKSON LABORATORIES PVT LTD" },
  { slNo: 244, indentSlNo: 351, item: "Vitamin A", dosage: "Oral liquid 100000 IU/ml", packSize: "100 ml bottle and 2 ml spoon with 1-2 ml marking", l1Rate: "103.6", bidder: "REVAT LABORATORIES PRIVATE LIMITED" },
  { slNo: 245, indentSlNo: 352, item: "Sterilized Water for Injection", dosage: "Injection", packSize: "10 ml ampoule", l1Rate: "1.51", bidder: "M/s Haseeb Pharmaceuticals Pvt Ltd" },
  { slNo: 246, indentSlNo: 353, item: "Xylometazoline", dosage: "Nasal drops 0.05 %", packSize: "10 ml bottle/ Drop", l1Rate: "4.98", bidder: "Pushkar Pharma" },
  { slNo: 247, indentSlNo: 354, item: "Xylometazoline", dosage: "Nasal drops 0.1 %", packSize: "10 ml bottle/ Drop", l1Rate: "5.32", bidder: "Pushkar Pharma" }

];

export default function RcHoldersPage() {
  const [search, setSearch] = useState("")

  const filtered = rcHolders.filter(
    (r) =>
      r.item.toLowerCase().includes(search.toLowerCase()) ||
      r.dosage.toLowerCase().includes(search.toLowerCase()) ||
      r.bidder.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">List of RC Holders</h1>

      <input
        type="text"
        placeholder="Search by Item, Dosage or Bidder..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full md:w-1/3 rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="overflow-x-auto rounded-xl border bg-white shadow">
        <table className="w-full text-sm">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="p-3 text-left">Sl. No.</th>
              <th className="p-3 text-left">Indent Sl. No.</th>
              <th className="p-3 text-left">Items</th>
              <th className="p-3 text-left">Dosage form & strength</th>
              <th className="p-3 text-left">Pack Size</th>
              <th className="p-3 text-left">L-1 Rate</th>
              <th className="p-3 text-left">Bidder</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.slNo} className="border-b hover:bg-blue-50">
                <td className="p-3">{r.slNo}</td>
                <td className="p-3">{r.indentSlNo}</td>
                <td className="p-3">{r.item}</td>
                <td className="p-3">{r.dosage}</td>
                <td className="p-3">{r.packSize}</td>
                <td className="p-3">{r.l1Rate}</td>
                <td className="p-3">{r.bidder}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
