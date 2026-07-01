export interface Product {
    Id: number
    Category: string
    "Sub-category": string
    "Sub-Sub-Category": string
    Name: string
    Composition: string
    Packing: string
    Mrp: number
    "Image-link": string
    "Visual-aid": string | null
}

export let PRODUCTS: Product[] = [
    {
        "Id": 1,
        "Category": "Orals ",
        "Sub-category": "TABLETS",
        "Sub-Sub-Category": "Anti-analgesic",
        "Name": "DICORREL-MR ",
        "Composition": "Diclofenac Potassium 50mg +Paracetamol 325mg+Chlorzoxazone 250mg",
        "Packing": "10x10 Blister",
        "Mrp": 1150.0,
        "Image-link": "https://i.ibb.co/5XXsGVmx/DICORREL-MR.png",
        "Visual-aid": "NA"
    },
    {
        "Id": 2,
        "Category": "Orals ",
        "Sub-category": "TABLETS",
        "Sub-Sub-Category": "Anti-analgesic",
        "Name": "DICORREL-PS ",
        "Composition": "Diclofenac  Potassium 50mg+ Serratiopeptidase 10mg+Paracetamol  325mg",
        "Packing": "10x10 Blister",
        "Mrp": 1130.0,
        "Image-link": "https://i.ibb.co/svThMPzv/DICORREL-PS.png",
        "Visual-aid": "NA"
    },
    {
        "Id": 3,
        "Category": "Orals ",
        "Sub-category": "TABLETS",
        "Sub-Sub-Category": "Anti-analgesic/Anti-Asthsmatics",
        "Name": "Montilex-D",
        "Composition": "Montelukast and Desloratadine Tablets",
        "Packing": "10x10 Alu Alu",
        "Mrp": 1650.0,
        "Image-link": "https://i.ibb.co/kgnXRKHT/MONTILEX-D.png",
        "Visual-aid": "NA"
    },
    {
        "Id": 4,
        "Category": "Orals ",
        "Sub-category": "TABLETS",
        "Sub-Sub-Category": "Anti-analgesic/Anti-Asthsmatics",
        "Name": "LEXOPAN-DSR",
        "Composition": "Pantoprazole Sodium40mg+ Domperidome SR 30mg Cap",
        "Packing": "10x10 Alu Alu",
        "Mrp": 1360.0,
        "Image-link": "https://i.ibb.co/Hp1RQ3hd/LEXOPAN-DSR.png",
        "Visual-aid": "NA"
    },
    {
        "Id": 5,
        "Category": "Orals ",
        "Sub-category": "TABLETS",
        "Sub-Sub-Category": "Anti-analgesic/Anti-Asthsmatics",
        "Name": "LEXACID-LSR",
        "Composition": "Rabeprazole Sodium 20mg+Levosulpiride (sr) 75mg",
        "Packing": "10x10 Alu Alu",
        "Mrp": 2150.0,
        "Image-link": "https://i.ibb.co/B5ZZHC9N/LEXACID-LSR.png",
        "Visual-aid": "NA"
    },
    {
        "Id": 6,
        "Category": "Orals ",
        "Sub-category": "TABLETS",
        "Sub-Sub-Category": "Anti-analgesic/Anti-Asthsmatics",
        "Name": "MONTILEX-L",
        "Composition": "Montelukast Sodium 10mg+Levocetirizine Dihydrochloride 5mg",
        "Packing": "10x10 Alu Alu",
        "Mrp": 1150.0,
        "Image-link": "https://i.ibb.co/Dg16y9Sc/MONTILEX-L.png",
        "Visual-aid": "NA"
    },
    {
        "Id": 7,
        "Category": "Orals ",
        "Sub-category": "TABLETS",
        "Sub-Sub-Category": "Anti-Biotic",
        "Name": "AMOLEX 625",
        "Composition": "Amoxycillin 500mg+ Potassium Clavulanate 125mg",
        "Packing": "10x10 Alu Alu ",
        "Mrp": 1965.0,
        "Image-link": "https://i.ibb.co/ynp2995K/AMOLEX-625.png",
        "Visual-aid": "NA"
    },
    {
        "Id": 8,
        "Category": "Orals ",
        "Sub-category": "TABLETS",
        "Sub-Sub-Category": "Anti-Biotic",
        "Name": "BIOROXIM-500",
        "Composition": "Cefuroxime Axetil 500mg",
        "Packing": "10x10 Alu Alu ",
        "Mrp": 5530.0,
        "Image-link": "https://i.ibb.co/GQcvqcRg/BIOROXIM-500-Tablets.png",
        "Visual-aid": "NA"
    },
    {
        "Id": 9,
        "Category": "Orals ",
        "Sub-category": "TABLETS",
        "Sub-Sub-Category": "Anti-Biotic",
        "Name": "LAXICEF-200 LB ",
        "Composition": "Cefixime Trihydrate200mg + Lactic Acid Bacillus 60 Million Spores",
        "Packing": "10x10 Alu Alu ",
        "Mrp": 1700.0,
        "Image-link": "https://i.ibb.co/sJv6prKB/LAXICEF-200-LB-Tablets.png",
        "Visual-aid": "NA"
    },
    {
        "Id": 10,
        "Category": "Orals ",
        "Sub-category": "TABLETS",
        "Sub-Sub-Category": "Anti-Biotic",
        "Name": "LAXICEF-O",
        "Composition": "Cefixime Trihydrate200mg + Ofloxacin 200mg",
        "Packing": "10x10 Alu Alu ",
        "Mrp": 1650.0,
        "Image-link": "https://i.ibb.co/HZV4vSG/LAXICEF-O-Tablets.png",
        "Visual-aid": "NA"
    },
    {
        "Id": 11,
        "Category": "Orals ",
        "Sub-category": "TABLETS",
        "Sub-Sub-Category": "Anti-Biotic",
        "Name": "LEXAFLOX ",
        "Composition": "Ofloxacin 200mg",
        "Packing": "10x10 Blister",
        "Mrp": 650.0,
        "Image-link": "https://i.ibb.co/tMb0PVGM/LEXAFLOX.png",
        "Visual-aid": "NA"
    },
    {
        "Id": 12,
        "Category": "Orals ",
        "Sub-category": "TABLETS",
        "Sub-Sub-Category": "Anti-Biotic",
        "Name": "LEXAFLOX OZ ",
        "Composition": "Ofloxacin 200mg+Ornidazole 500mg ",
        "Packing": "10x10 Blister",
        "Mrp": 890.0,
        "Image-link": "https://i.ibb.co/qYnCJrzs/LEXAFLOX-OZ.png",
        "Visual-aid": "NA"
    },
    {
        "Id": 13,
        "Category": "Orals ",
        "Sub-category": "TABLETS",
        "Sub-Sub-Category": "Anti-Biotic",
        "Name": "SINPOD-200",
        "Composition": "Cefpodoxime Proxetil 200mg",
        "Packing": "10x10 Alu Alu ",
        "Mrp": 3100.0,
        "Image-link": "https://i.ibb.co/0yBhcpLZ/SINPOD-200-Tablets.png",
        "Visual-aid": "NA"
    },
    {
        "Id": 14,
        "Category": "Orals ",
        "Sub-category": "TABLETS",
        "Sub-Sub-Category": "Anti-Fibrinolytic",
        "Name": "HEMOSIL ",
        "Composition": "Tranexamic Acid 500mg",
        "Packing": "10x10 Alu Alu ",
        "Mrp": 1990.0,
        "Image-link": "https://i.ibb.co/bMSsXB9k/Hemosil.png",
        "Visual-aid": "NA"
    },
    {
        "Id": 15,
        "Category": "Orals ",
        "Sub-category": "TABLETS",
        "Sub-Sub-Category": "Anti-Fibrinolytic",
        "Name": "HEMOSIL-M  ",
        "Composition": "Tranexamic Acid 500mg + Mefenamic Acid 250mg",
        "Packing": "10x10 Alu Alu ",
        "Mrp": 2850.0,
        "Image-link": "https://i.ibb.co/h1m4XRxb/HEMOSIL-M.png",
        "Visual-aid": "NA"
    },
    {
        "Id": 16,
        "Category": "Skin Range ",
        "Sub-category": "OINTMENTS ",
        "Sub-Sub-Category": "Antiseptic & Antibacterial",
        "Name": "MEDISEPT ",
        "Composition": "Povidone Iodine 5%+Ornidazole 1%",
        "Packing": "15GM ",
        "Mrp": 105.0,
        "Image-link": "https://i.ibb.co/dw9nW4ZW/MEDISEPT.png",
        "Visual-aid": "NA"
    },
    {
        "Id": 17,
        "Category": "Skin Range ",
        "Sub-category": "OINTMENTS ",
        "Sub-Sub-Category": "Analgesic",
        "Name": "FLEXA GEL",
        "Composition": "Diclofenac Diethylamine 1.16%w/w+ Linseed Oil 3% w/w + Methyl Salicylate 10.%w/w + Menthol 5%w/w +Benzyl Alcohol 1%w/w",
        "Packing": "30gm",
        "Mrp": 105.0,
        "Image-link": "https://i.ibb.co/7dKTjs45/Flexa-gel.png",
        "Visual-aid": "NA"
    },
    {
        "Id": 18,
        "Category": "Orals ",
        "Sub-category": "LIQUID SYRUP ",
        "Sub-Sub-Category": "Anti-Biotic",
        "Name": "AMOLEX-KID ",
        "Composition": "Amoxycillin 200mg+ Potassium Clavulanate 28.5mg",
        "Packing": "30ml ",
        "Mrp": 65.2,
        "Image-link": "https://i.ibb.co/s96SMfzZ/AMOLEX-KID.png",
        "Visual-aid": "NA"
    },
    {
        "Id": 19,
        "Category": "Orals ",
        "Sub-category": "LIQUID SYRUP ",
        "Sub-Sub-Category": "Appetite Stimulant",
        "Name": "EATWELL",
        "Composition": "Cyproheptadine 2mg with Tricholine Citrate 275mg ",
        "Packing": "200ml",
        "Mrp": 165.0,
        "Image-link": "https://i.ibb.co/0yX29KXt/EATWELL-Syrup.png",
        "Visual-aid": "NA"
    },
    {
        "Id": 20,
        "Category": "Orals ",
        "Sub-category": "LIQUID SYRUP ",
        "Sub-Sub-Category": "CALCIUM & VITAMIN. D3 SUPPLEMENTS",
        "Name": "LEXI DCARE NANO SHOT ",
        "Composition": "Cholecalciferol IP 60000 IU",
        "Packing": "4x5ml ",
        "Mrp": 85.0,
        "Image-link": "https://i.ibb.co/jkkt3hNc/LEXI-DCARE.png",
        "Visual-aid": "NA"
    },
    {
        "Id": 21,
        "Category": "Orals ",
        "Sub-category": "LIQUID SYRUP ",
        "Sub-Sub-Category": "EXPECTORANTS & ANTI TUSSIVE",
        "Name": "LECTUS ",
        "Composition": "Dextromethorphan 10mg+CPM 2mg+Phenylephrine 5mg",
        "Packing": "100ml",
        "Mrp": 82.0,
        "Image-link": "https://i.ibb.co/1Yf9FCw9/Lectus.png",
        "Visual-aid": "NA"
    },
    {
        "Id": 22,
        "Category": "Orals ",
        "Sub-category": "LIQUID SYRUP ",
        "Sub-Sub-Category": "FOOD SUPPLEMENTS",
        "Name": "LEXAONE",
        "Composition": "Antioxidants +Multivitamin+ Multiminral & Cyanobabamin ",
        "Packing": "200ml",
        "Mrp": 148.5,
        "Image-link": "https://i.ibb.co/SpbL4sq/LEXAONE-Syrup.png",
        "Visual-aid": "NA"
    },
    {
        "Id": 23,
        "Category": "Orals ",
        "Sub-category": "DRY SYRUP ",
        "Sub-Sub-Category": "Anti-Biotic",
        "Name": "SINPOD-50",
        "Composition": "Cefpodoxime Proxetil 50mg ",
        "Packing": "30ml ",
        "Mrp": 95.0,
        "Image-link": "https://i.ibb.co/MkLtYg7B/SINPOD-50.png",
        "Visual-aid": "NA"
    },
    {
        "Id": 24,
        "Category": "Orals ",
        "Sub-category": "TABLETS",
        "Sub-Sub-Category": "NSAIDS/ANALGESIC/PROTEOLYTIC",
        "Name": "DICORREL-S ",
        "Composition": "Diclofenac Sodium 50mg+Serratiopeptidase10mg",
        "Packing": "10x10 Alu Alu ",
        "Mrp": 950.0,
        "Image-link": "https://i.ibb.co/3mg7sG4V/DICORREL-S.png",
        "Visual-aid": "NA"
    },
    {
        "Id": 25,
        "Category": "Orals ",
        "Sub-category": "TABLETS",
        "Sub-Sub-Category": "Pre Pro ",
        "Name": "BIOLECTIK ",
        "Composition": "Lactobacillus acidophilus 75mg+Lactobacillus rhamnosus 75mg+Bifidobacterium longum 75mg+Saccharomyces boulardii 50mg+Fructo-oligo saccharides 100mg",
        "Packing": "10x10 Alu Alu ",
        "Mrp": 1400.0,
        "Image-link": "https://i.ibb.co/1JrtrYNW/BIOLECTIK.png",
        "Visual-aid": "NA"
    },
    {
        "Id": 26,
        "Category": "Orals ",
        "Sub-category": "TABLETS",
        "Sub-Sub-Category": "PROTON-PUMP-INHIBITOR",
        "Name": "LEXACID-20 ",
        "Composition": "Rabeprazole Sodium 20mg ",
        "Packing": "10x10 Alu Alu ",
        "Mrp": 600.0,
        "Image-link": "https://i.ibb.co/gbxX1MhR/LEXACID-20.png",
        "Visual-aid": "NA"
    },
    {
        "Id": 27,
        "Category": "Orals ",
        "Sub-category": "TABLETS",
        "Sub-Sub-Category": "PROTON-PUMP-INHIBITOR",
        "Name": "LEXACID-D  ",
        "Composition": "Rabeprazole Sodium20mg +Domperidone 10mg",
        "Packing": "10x10 Alu Alu ",
        "Mrp": 650.0,
        "Image-link": "https://i.ibb.co/WW4hs9DW/Lexacid-D.png",
        "Visual-aid": "NA"
    },
    {
        "Id": 28,
        "Category": "Orals ",
        "Sub-category": "TABLETS",
        "Sub-Sub-Category": "Steriod",
        "Name": "DEFLAXIL",
        "Composition": "Deflazacort 6mg",
        "Packing": "10x10 Alu Alu ",
        "Mrp": 1250.0,
        "Image-link": "https://i.ibb.co/CgV7W76/DEFLAXIL.png",
        "Visual-aid": "NA"
    }
]

// Load products data
import("./product").then((module) => {
    PRODUCTS = module.default
})

// Helper function to generate slug from product name
export function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .trim()                         // ✅ remove leading/trailing spaces
        .replace(/[^a-z0-9]+/g, "-")    // ✅ collapse all non-alphanum to single hyphen
        .replace(/^-+|-+$/g, "")        // ✅ remove leading/trailing hyphens
}


// Helper function to find product by slug
export function getProductBySlug(slug: string): Product | undefined {
    const cleanSlug = slug.replace(/-+$/, "") // remove trailing hyphens

    return PRODUCTS.find(
        (product) => generateSlug(product.Name) === cleanSlug
    )
}


// Helper function to get related products by category
export function getRelatedProducts(subsubcategory: string, excludeId: number): Product[] {
    return PRODUCTS.filter((product) => product["Sub-Sub-Category"] === subsubcategory && product.Id !== excludeId).slice(0, 3)
}

// Server-side fetch — runs on server, returns full product list to be passed
// as props to client components so the page can be rendered as SSR.
export async function getAllProducts(): Promise<Product[]> {
    return PRODUCTS
}

