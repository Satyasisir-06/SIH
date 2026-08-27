// Official SIH 2026 problem statements imported from the college-supplied list.
// The explorer, filters and registration form read from this single source.

export type ProblemStatement = {
  id: string;
  title: string;
  organization: string;
  category: "Software" | "Hardware";
  theme: string;
  domain: string;
  tags: string[];
};

export const PROBLEM_STATEMENTS: ProblemStatement[] = [
  {
    "id": "SIH26001",
    "title": "AI-Based early warning and landslide Risk Monitoring System in NER",
    "organization": "Ministry of Development of North Eastern Region (MDoNER)",
    "category": "Software",
    "theme": "Disaster Management",
    "domain": "Disaster Management",
    "tags": [
      "AI/ML",
      "IoT",
      "Software"
    ]
  },
  {
    "id": "SIH26002",
    "title": "Al-Based Smart Logistics and Accessibility Intelligence Platform for North Eastern Region (NER)",
    "organization": "Ministry of Development of North Eastern Region (MDoNER)",
    "category": "Software",
    "theme": "Smart Automation",
    "domain": "Smart Automation",
    "tags": [
      "AI/ML",
      "Web",
      "Automation",
      "Software"
    ]
  },
  {
    "id": "SIH26003",
    "title": "AI-Based Cognitive Gaming and Memory Assistance Platform for Elderly Dementia Patients in North Eastern Region (NER)",
    "organization": "Ministry of Development of North Eastern Region (MDoNER)",
    "category": "Software",
    "theme": "Space Technology",
    "domain": "Space Technology",
    "tags": [
      "AI/ML",
      "Web",
      "Healthcare",
      "Software"
    ]
  },
  {
    "id": "SIH26004",
    "title": "Al-Assisted Early Detection System for Osteoarthritis (OA) Risk Markers in North Eastern Region (NER)",
    "organization": "Ministry of Development of North Eastern Region (MDoNER)",
    "category": "Hardware",
    "theme": "Space Technology",
    "domain": "Space Technology",
    "tags": [
      "AI/ML",
      "Hardware"
    ]
  },
  {
    "id": "SIH26005",
    "title": "Solar-Powered Smart Mini Cold Storage System for Fresh Vegetables in North Eastern Region (NER)",
    "organization": "Ministry of Development of North Eastern Region (MDoNER)",
    "category": "Hardware",
    "theme": "Smart Vehicles",
    "domain": "Smart Vehicles",
    "tags": [
      "Smart Vehicles",
      "Hardware"
    ]
  },
  {
    "id": "SIH26006",
    "title": "Development of an Intelligent Freight Forecasting Model for Optimized Vessel Chartering and Bulk Cargo Procurement from overseas to East Coast of India",
    "organization": "Ministry of Steel",
    "category": "Software",
    "theme": "Transportation & Logistics",
    "domain": "Transportation & Logistics",
    "tags": [
      "AI/ML",
      "Geo-Location",
      "Software"
    ]
  },
  {
    "id": "SIH26007",
    "title": "Safe and Efficient Operation of Mine Vehicles in Fog and Low-Visibility Conditions in Open Cast Iron Ore Mines.",
    "organization": "Ministry of Steel",
    "category": "Hardware",
    "theme": "Smart Automation",
    "domain": "Smart Automation",
    "tags": [
      "Automation",
      "Hardware"
    ]
  },
  {
    "id": "SIH26008",
    "title": "Belt Joint Rupture and Conveyor Belt Damages in Iron Ore Mining Industry: Intelligent Monitoring and Prediction of Conveyor Belt Joint Rupture and Damages in Iron Ore Mining Industry.",
    "organization": "Ministry of Steel",
    "category": "Hardware",
    "theme": "Smart Automation",
    "domain": "Smart Automation",
    "tags": [
      "AI/ML",
      "Automation",
      "Hardware"
    ]
  },
  {
    "id": "SIH26009",
    "title": "Using AI/ML and Space Technology to Identify Manganese Reserves and Overcome Production Shortfalls.",
    "organization": "Ministry of Steel",
    "category": "Software",
    "theme": "Smart Automation",
    "domain": "Smart Automation",
    "tags": [
      "AI/ML",
      "Automation",
      "Software"
    ]
  },
  {
    "id": "SIH26010",
    "title": "Survey/Resurvey of Rural Agricultural Land in lndia",
    "organization": "Ministry of Rural Development",
    "category": "Hardware",
    "theme": "Smart Automation",
    "domain": "Smart Automation",
    "tags": [
      "Automation",
      "Hardware"
    ]
  },
  {
    "id": "SIH26011",
    "title": "3D ULPIN Generation and vertical Property Mapping SYstem",
    "organization": "Ministry of Rural Development",
    "category": "Software",
    "theme": "Space Technology",
    "domain": "Space Technology",
    "tags": [
      "Geo-Location",
      "Software"
    ]
  },
  {
    "id": "SIH26012",
    "title": "AI-Based Automated Urban Parcel Mapping and Cadastral Feature Extraction System using Drone lmagery",
    "organization": "Ministry of Rural Development",
    "category": "Software",
    "theme": "Robotics and Drones",
    "domain": "Robotics and Drones",
    "tags": [
      "AI/ML",
      "IoT",
      "Automation",
      "Software"
    ]
  },
  {
    "id": "SIH26013",
    "title": "Automated lntegration and lntelligent Harmonization of Multi-source Geospatial Data for urban Land Record Management.",
    "organization": "Ministry of Rural Development",
    "category": "Software",
    "theme": "Disaster Management",
    "domain": "Disaster Management",
    "tags": [
      "Data Science",
      "Automation",
      "Geo-Location",
      "Software"
    ]
  },
  {
    "id": "SIH26014",
    "title": "An lntegrated GIS-based Digital Public lnfrastructure for Land Governance",
    "organization": "Ministry of Rural Development",
    "category": "Software",
    "theme": "Robotics and Drones",
    "domain": "Robotics and Drones",
    "tags": [
      "IoT",
      "Automation",
      "Geo-Location",
      "Software"
    ]
  },
  {
    "id": "SIH26015",
    "title": "Application of Geospatial Techniques for visualization and analysis to interpret Geo-Coded lmages to enhance watershed Development Outcomes.",
    "organization": "Ministry of Rural Development",
    "category": "Software",
    "theme": "Disaster Management",
    "domain": "Disaster Management",
    "tags": [
      "Data Science",
      "Geo-Location",
      "Software"
    ]
  },
  {
    "id": "SIH26016",
    "title": "Real-Time National Land Acquisition & Management System for End-to-End Digital Monitoring and Decision Support",
    "organization": "Ministry of Rural Development",
    "category": "Software",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "Miscellaneous",
      "Software"
    ]
  },
  {
    "id": "SIH26017",
    "title": "Predictive Analytics System for Early Detection of Land Acquisition Delays",
    "organization": "Ministry of Rural Development",
    "category": "Software",
    "theme": "Agriculture, FoodTech & Rural Development",
    "domain": "Agriculture, FoodTech & Rural Development",
    "tags": [
      "AI/ML",
      "Data Science",
      "Software"
    ]
  },
  {
    "id": "SIH26018",
    "title": "Intelligent Land Record Digitization and Validation System",
    "organization": "Ministry of Rural Development",
    "category": "Software",
    "theme": "MedTech / BioTech / HealthTech",
    "domain": "MedTech / BioTech / HealthTech",
    "tags": [
      "AI/ML",
      "IoT",
      "Healthcare",
      "Software"
    ]
  },
  {
    "id": "SIH26019",
    "title": "National Digital Platform for Research, Policy Innovation, and Evidence-Based Land Governance",
    "organization": "Ministry of Rural Development",
    "category": "Software",
    "theme": "Blockchain & Cybersecurity",
    "domain": "Blockchain & Cybersecurity",
    "tags": [
      "Blockchain",
      "Web",
      "Cybersecurity",
      "Software"
    ]
  },
  {
    "id": "SIH26020",
    "title": "Design and Development of Innovative Hand-Spinning Equipment for Enhancing Khadi Artisan Productivity and Income",
    "organization": "Ministry of MSME",
    "category": "Hardware",
    "theme": "Blockchain & Cybersecurity",
    "domain": "Blockchain & Cybersecurity",
    "tags": [
      "Blockchain",
      "Cybersecurity",
      "Hardware"
    ]
  },
  {
    "id": "SIH26021",
    "title": "Honey Chain: A block chain-based system for honey traceability and smart beekeeping management.",
    "organization": "Ministry of MSME",
    "category": "Software",
    "theme": "Smart Automation",
    "domain": "Smart Automation",
    "tags": [
      "Automation",
      "Software"
    ]
  },
  {
    "id": "SIH26022",
    "title": "Design and develop a smart, solar-powered drying and compact packaging system to support home-based agarbatti manufacturing by rural women artisans.",
    "organization": "Ministry of MSME",
    "category": "Hardware",
    "theme": "Agriculture, FoodTech & Rural Development",
    "domain": "Agriculture, FoodTech & Rural Development",
    "tags": [
      "Agriculture, FoodTec",
      "Hardware"
    ]
  },
  {
    "id": "SIH26023",
    "title": "AI-Powered Geological, Mining and other Reporting Solution for CMPDI/CIL subsidiaries",
    "organization": "Ministry of Coal",
    "category": "Software",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "AI/ML",
      "Geo-Location",
      "Software"
    ]
  },
  {
    "id": "SIH26024",
    "title": "AI-Based Smart Governance and Compliance Monitoring System for Coal Mines",
    "organization": "Ministry of Coal",
    "category": "Software",
    "theme": "Smart Automation",
    "domain": "Smart Automation",
    "tags": [
      "AI/ML",
      "IoT",
      "Automation",
      "Software"
    ]
  },
  {
    "id": "SIH26025",
    "title": "Development of an AI-enabled Low Cost Real Time Mine Subsidence Monitoring, Prediction and Early Warning System for Underground Coal Mines in India",
    "organization": "Ministry of Coal",
    "category": "Hardware",
    "theme": "Disaster Management",
    "domain": "Disaster Management",
    "tags": [
      "AI/ML",
      "Hardware"
    ]
  },
  {
    "id": "SIH26026",
    "title": "Development of Mobile (Quadruped)/Handheld Device/System for Real-Time Detection of Narcotics and Explosives across Indian Railways.",
    "organization": "Ministry of Railways",
    "category": "Hardware",
    "theme": "Robotics and Drones",
    "domain": "Robotics and Drones",
    "tags": [
      "IoT",
      "Mobile App",
      "Automation",
      "Hardware"
    ]
  },
  {
    "id": "SIH26027",
    "title": "Al-Powered Automatic Block Planning to Maximize Asset Availability for Train Operations on Indian Railways",
    "organization": "Ministry of Railways",
    "category": "Software",
    "theme": "Transportation & Logistics",
    "domain": "Transportation & Logistics",
    "tags": [
      "AI/ML",
      "Automation",
      "Geo-Location",
      "Software"
    ]
  },
  {
    "id": "SIH26028",
    "title": "Dynamic Forecast of Expected Time of Arrival (ETA) for Coaching Trains",
    "organization": "Ministry of Railways",
    "category": "Software",
    "theme": "Disaster Management",
    "domain": "Disaster Management",
    "tags": [
      "Disaster Management",
      "Software"
    ]
  },
  {
    "id": "SIH26029",
    "title": "Automated High-Current Short-Circuit Test System for IEC 60898-1:2015 MCB Compliance.",
    "organization": "Ministry of Consumer Affairs, Food & Public Distribution",
    "category": "Hardware",
    "theme": "Disaster Management",
    "domain": "Disaster Management",
    "tags": [
      "Automation",
      "Hardware"
    ]
  },
  {
    "id": "SIH26030",
    "title": "Automated Cable Specimen Preparation System for IS 10810 and IS 7098 Compliance.",
    "organization": "Ministry of Consumer Affairs, Food & Public Distribution",
    "category": "Hardware",
    "theme": "Smart Automation",
    "domain": "Smart Automation",
    "tags": [
      "Automation",
      "Hardware"
    ]
  },
  {
    "id": "SIH26031",
    "title": "Quality assessment and grading of onions are often subjective and vary across procurement centers, resulting in disputes and inconsistencies.",
    "organization": "Ministry of Consumer Affairs, Food & Public Distribution",
    "category": "Software",
    "theme": "Fitness & Sports",
    "domain": "Fitness & Sports",
    "tags": [
      "Fitness",
      "Software"
    ]
  },
  {
    "id": "SIH26032",
    "title": "Farmers often face long waiting times, lack of information regarding procurement schedules, and uncertainty about procurement status.",
    "organization": "Ministry of Consumer Affairs, Food & Public Distribution",
    "category": "Software",
    "theme": "Heritage & Culture",
    "domain": "Heritage & Culture",
    "tags": [
      "Heritage",
      "Software"
    ]
  },
  {
    "id": "SIH26033",
    "title": "Multiple intermediaries reduce farmers earnings and increase consumer prices.",
    "organization": "Ministry of Consumer Affairs, Food & Public Distribution",
    "category": "Software",
    "theme": "MedTech / BioTech / HealthTech",
    "domain": "MedTech / BioTech / HealthTech",
    "tags": [
      "IoT",
      "Healthcare",
      "Software"
    ]
  },
  {
    "id": "SIH26034",
    "title": "Software System to check compliance of Packaged Commodities under Legal Metrology(Packaged Commodities) Rules, 2011 by scanning products, images and labels.",
    "organization": "Ministry of Consumer Affairs, Food & Public Distribution",
    "category": "Software",
    "theme": "Agriculture, FoodTech & Rural Development",
    "domain": "Agriculture, FoodTech & Rural Development",
    "tags": [
      "Image Processing",
      "Software"
    ]
  },
  {
    "id": "SIH26035",
    "title": "Development of a Software Program/Application for Generation of Test Reports for Non-Automatic Weighing Instruments (NAWI) as per OIML Recommendation R- 76",
    "organization": "Ministry of Consumer Affairs, Food & Public Distribution",
    "category": "Software",
    "theme": "Smart Vehicles",
    "domain": "Smart Vehicles",
    "tags": [
      "AI/ML",
      "Automation",
      "Software"
    ]
  },
  {
    "id": "SIH26036",
    "title": "Development of an Online Verification System for Weighing and Measuring Instruments",
    "organization": "Ministry of Consumer Affairs, Food & Public Distribution",
    "category": "Software",
    "theme": "Transportation & Logistics",
    "domain": "Transportation & Logistics",
    "tags": [
      "Geo-Location",
      "Software"
    ]
  },
  {
    "id": "SIH26037",
    "title": "Adaptive Path Planning and Collision Avoidance for Autonomous Vehicles on Unstructured Indian Roads",
    "organization": "MathWorks",
    "category": "Software",
    "theme": "Robotics and Drones",
    "domain": "Robotics and Drones",
    "tags": [
      "IoT",
      "Automation",
      "Software"
    ]
  },
  {
    "id": "SIH26038",
    "title": "Explainable AI for Diabetic Retinopathy Screening in Rural India",
    "organization": "MathWorks",
    "category": "Software",
    "theme": "Clean & Green Technology",
    "domain": "Clean & Green Technology",
    "tags": [
      "AI/ML",
      "Software"
    ]
  },
  {
    "id": "SIH26039",
    "title": "Al-Powered Underground Mine Safety, Monitoring and Rescue System.",
    "organization": "Governmcnt of Jharkhand",
    "category": "Hardware",
    "theme": "Travel & Tourism",
    "domain": "Travel & Tourism",
    "tags": [
      "AI/ML",
      "Hardware"
    ]
  },
  {
    "id": "SIH26040",
    "title": "Smart Water Purification and Quality Monitoring System for Rural and Mining-Affected Areas.",
    "organization": "Governmcnt of Jharkhand",
    "category": "Hardware",
    "theme": "Renewable / Sustainable Energy",
    "domain": "Renewable / Sustainable Energy",
    "tags": [
      "IoT",
      "Hardware"
    ]
  },
  {
    "id": "SIH26041",
    "title": "AR-Based Vocational Training Simulator for Industrial Safety in Jharkhand's Mining & Manufacturing Sector",
    "organization": "Governmcnt of Jharkhand",
    "category": "Software",
    "theme": "Blockchain & Cybersecurity",
    "domain": "Blockchain & Cybersecurity",
    "tags": [
      "Blockchain",
      "AR/VR",
      "Cybersecurity",
      "Software"
    ]
  },
  {
    "id": "SIH26042",
    "title": "Al-Powered Vernacular Pedagogy and Real-Time Translation Tool for Mother Tongue-Based Primary Education",
    "organization": "Governmcnt of Jharkhand",
    "category": "Software",
    "theme": "Smart Education",
    "domain": "Smart Education",
    "tags": [
      "AI/ML",
      "EdTech",
      "Software"
    ]
  },
  {
    "id": "SIH26043",
    "title": "A digital platform to crowdsource societal challenges and facilitate collaborative problem solving through universities and industry partnerships",
    "organization": "Governmcnt of Jharkhand",
    "category": "Software",
    "theme": "Disaster Management",
    "domain": "Disaster Management",
    "tags": [
      "Web",
      "Software"
    ]
  },
  {
    "id": "SIH26044",
    "title": "Portal for Academia - Industry collaboration for Skill Mapping, Internships and Placement",
    "organization": "Ministry of Ayush",
    "category": "Software",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "Web",
      "Geo-Location",
      "Software"
    ]
  },
  {
    "id": "SIH26045",
    "title": "IP-SAKTI Sahayak a multilingual, RAG-based (source-cited) AI assistant for Intellectual Property and regulatory guidance in Ayurveda, across national and international regimes.",
    "organization": "Ministry of Ayush",
    "category": "Software",
    "theme": "Toys & Games",
    "domain": "Toys & Games",
    "tags": [
      "AI/ML",
      "Software"
    ]
  },
  {
    "id": "SIH26046",
    "title": "AIIA Clinical Trials Dashboard - a real-time, cloud-based, GCP-compliant Clinical Trial Management System (CTMS) for Ayurveda research, with CDISC/FHIR-interoperable data, role-based KPIs, and integrated ethics, regulatory (CTRI / NDCT Rules 2019) and pharmacovigilance tracking.",
    "organization": "Ministry of Ayush",
    "category": "Software",
    "theme": "Space Technology",
    "domain": "Space Technology",
    "tags": [
      "Data Science",
      "Cloud",
      "Software"
    ]
  },
  {
    "id": "SIH26047",
    "title": "Patient Case-Taking Software",
    "organization": "Ministry of Ayush",
    "category": "Software",
    "theme": "Smart Automation",
    "domain": "Smart Automation",
    "tags": [
      "Automation",
      "Healthcare",
      "Software"
    ]
  },
  {
    "id": "SIH26048",
    "title": "iKwath - a pod-based smart Kwatha (Kadha) maker that prepares a fresh, AFI/API-standardized decoction from coarse powder (yavaku?a c?r?a) on demand, in the shortest practical time without altering the decoctions quality or yield",
    "organization": "Ministry of Ayush",
    "category": "Hardware",
    "theme": "Fitness & Sports",
    "domain": "Fitness & Sports",
    "tags": [
      "Fitness",
      "Hardware"
    ]
  },
  {
    "id": "SIH26049",
    "title": "Modifications to improve the reliability, efficiency,and lifespan of electrical and electronic equipment and systems in the ambient condition of subzero temperature and low pressure of High Altitude Areas(HAA) and Super High Altitude Areas (SHAA) of Ladakh region.",
    "organization": "DRDO",
    "category": "Hardware",
    "theme": "Heritage & Culture",
    "domain": "Heritage & Culture",
    "tags": [
      "Heritage",
      "Hardware"
    ]
  },
  {
    "id": "SIH26050",
    "title": "High Altitude Performance Optimization and Robust Design of Anti-Drone System.",
    "organization": "DRDO",
    "category": "Hardware",
    "theme": "MedTech / BioTech / HealthTech",
    "domain": "MedTech / BioTech / HealthTech",
    "tags": [
      "IoT",
      "Healthcare",
      "Hardware"
    ]
  },
  {
    "id": "SIH26051",
    "title": "Software Based Model Development for Design of Area Specific Shelter for Thermal Comfort Maintenance.",
    "organization": "DRDO",
    "category": "Software",
    "theme": "Agriculture, FoodTech & Rural Development",
    "domain": "Agriculture, FoodTech & Rural Development",
    "tags": [
      "Agriculture, FoodTec",
      "Software"
    ]
  },
  {
    "id": "SIH26052",
    "title": "To develop an AI/ML-enabled adaptive noise cancellation (ANC) system that effectively suppresses stationary, non-stationary, and impulsive defence noises while maintaining high speech intelligibility and real-time performance on embedded hardware.",
    "organization": "DRDO",
    "category": "Hardware",
    "theme": "Smart Vehicles",
    "domain": "Smart Vehicles",
    "tags": [
      "AI/ML",
      "Hardware"
    ]
  },
  {
    "id": "SIH26053",
    "title": "Adaptive Variable Resolution 2.5D Lidar Mapping for Dynamic Environment Perception",
    "organization": "DRDO",
    "category": "Software",
    "theme": "Transportation & Logistics",
    "domain": "Transportation & Logistics",
    "tags": [
      "Geo-Location",
      "Software"
    ]
  },
  {
    "id": "SIH26054",
    "title": "AI-Enabled Real-Time Digital Twin System for Health Monitoring, Fault Prediction and Mission Reliability Enhancement of Aero Piston Engines used in MALE UAVs.",
    "organization": "DRDO",
    "category": "Software",
    "theme": "Robotics and Drones",
    "domain": "Robotics and Drones",
    "tags": [
      "AI/ML",
      "IoT",
      "Automation",
      "Software"
    ]
  },
  {
    "id": "SIH26055",
    "title": "Smart Scan strategy for Electronic Warfare",
    "organization": "DRDO",
    "category": "Software",
    "theme": "Clean & Green Technology",
    "domain": "Clean & Green Technology",
    "tags": [
      "Clean",
      "Software"
    ]
  },
  {
    "id": "SIH26056",
    "title": "Development of a Real-time Airfare Price Index for India through Automated Web Scraping of Airline and Online Travel Aggregator Portals for Augmentation of the Consumer Price Index (CPI).",
    "organization": "MoSPI",
    "category": "Software",
    "theme": "Travel & Tourism",
    "domain": "Travel & Tourism",
    "tags": [
      "Web",
      "Automation",
      "Software"
    ]
  },
  {
    "id": "SIH26057",
    "title": "AI-Powered Automated Underwater Marine Debris and Anomaly Detection System using Side-Scan Sonar Imagery",
    "organization": "Ministry of Earth Sciences (MoES)",
    "category": "Software",
    "theme": "Renewable / Sustainable Energy",
    "domain": "Renewable / Sustainable Energy",
    "tags": [
      "AI/ML",
      "Automation",
      "Image Processing",
      "Software"
    ]
  },
  {
    "id": "SIH26058",
    "title": "Development of a Low-Power, Real-Time Adaptive Software-Defined Sonar Transmitter Payload for Autonomous Underwater Vehicles (AUVs)",
    "organization": "Ministry of Earth Sciences (MoES)",
    "category": "Hardware",
    "theme": "Blockchain & Cybersecurity",
    "domain": "Blockchain & Cybersecurity",
    "tags": [
      "Blockchain",
      "Cybersecurity",
      "Hardware"
    ]
  },
  {
    "id": "SIH26059",
    "title": "AI-Enabled Antarctic Sea-Ice, Iceberg Trajectory, and Navigation Decision Support System",
    "organization": "Ministry of Earth Sciences (MoES)",
    "category": "Software",
    "theme": "Smart Education",
    "domain": "Smart Education",
    "tags": [
      "AI/ML",
      "EdTech",
      "Software"
    ]
  },
  {
    "id": "SIH26060",
    "title": "Digital Platform for efficient remote management of Indian Antarctic Research Stations",
    "organization": "Ministry of Earth Sciences (MoES)",
    "category": "Software",
    "theme": "Disaster Management",
    "domain": "Disaster Management",
    "tags": [
      "Web",
      "Software"
    ]
  },
  {
    "id": "SIH26061",
    "title": "AI-Driven Smart Energy Management System for Polar Research Stations",
    "organization": "Ministry of Earth Sciences (MoES)",
    "category": "Software",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "AI/ML",
      "Software"
    ]
  },
  {
    "id": "SIH26062",
    "title": "Integrated Polar Expedition Logistics and Asset Management System",
    "organization": "Ministry of Earth Sciences (MoES)",
    "category": "Software",
    "theme": "Toys & Games",
    "domain": "Toys & Games",
    "tags": [
      "Geo-Location",
      "Software"
    ]
  },
  {
    "id": "SIH26063",
    "title": "Integrated Polar Science Outreach, Knowledge Repository and Media Dissemination Portal",
    "organization": "Ministry of Earth Sciences (MoES)",
    "category": "Software",
    "theme": "Space Technology",
    "domain": "Space Technology",
    "tags": [
      "Web",
      "Software"
    ]
  },
  {
    "id": "SIH26064",
    "title": "Low-Cost Deployable Seafloor Metal Detection Sensor for Ocean Resource Exploration",
    "organization": "Ministry of Earth Sciences (MoES)",
    "category": "Hardware",
    "theme": "Smart Resource Conservation",
    "domain": "Smart Resource Conservation",
    "tags": [
      "IoT",
      "Hardware"
    ]
  },
  {
    "id": "SIH26065",
    "title": "Autonomous Low-Cost Ocean Observation Platform for Polar and Southern Oceans",
    "organization": "Ministry of Earth Sciences (MoES)",
    "category": "Hardware",
    "theme": "Smart Automation",
    "domain": "Smart Automation",
    "tags": [
      "Web",
      "Automation",
      "Hardware"
    ]
  },
  {
    "id": "SIH26066",
    "title": "OceanEmbed - Satellite Embedding-Based Deep Learning Framework for Reconstruction of Subsurface Ocean Temperature from Surface Satellite Observations.",
    "organization": "Ministry of Earth Sciences (MoES)",
    "category": "Software",
    "theme": "Space Technology",
    "domain": "Space Technology",
    "tags": [
      "AI/ML",
      "EdTech",
      "Geo-Location",
      "Software"
    ]
  },
  {
    "id": "SIH26067",
    "title": "Develop a web-based interactive 3D visualization platform that integrates numerical ocean model outputs and in-situ observations.",
    "organization": "Ministry of Earth Sciences (MoES)",
    "category": "Software",
    "theme": "Smart Automation",
    "domain": "Smart Automation",
    "tags": [
      "Data Science",
      "Web",
      "Automation",
      "Software"
    ]
  },
  {
    "id": "SIH26068",
    "title": "WeatherGPT: Conversational AI for Weather Forecasting, Alerts, and Climate Information",
    "organization": "Ministry of Earth Sciences (MoES)",
    "category": "Software",
    "theme": "Disaster Management",
    "domain": "Disaster Management",
    "tags": [
      "AI/ML",
      "Software"
    ]
  },
  {
    "id": "SIH26069",
    "title": "National Weather Big Data Analytics Platform",
    "organization": "Ministry of Earth Sciences (MoES)",
    "category": "Software",
    "theme": "Disaster Management",
    "domain": "Disaster Management",
    "tags": [
      "Data Science",
      "Web",
      "Software"
    ]
  },
  {
    "id": "SIH26070",
    "title": "To develop an Artificial Intelligence (AI) / Machine Learning (ML) based system for identification, classification, and prediction of different tropical cyclone patterns using multi-source satellite data.",
    "organization": "Ministry of Earth Sciences (MoES)",
    "category": "Software",
    "theme": "Smart Education",
    "domain": "Smart Education",
    "tags": [
      "AI/ML",
      "Data Science",
      "EdTech",
      "Software"
    ]
  },
  {
    "id": "SIH26071",
    "title": "AI/ML-Based Integrated heavy rainfall Early Warning and Inundation Prediction System using Satellite, Radar, observational Weather and numerical weather prediction model data.",
    "organization": "Ministry of Earth Sciences (MoES)",
    "category": "Software",
    "theme": "Disaster Management",
    "domain": "Disaster Management",
    "tags": [
      "AI/ML",
      "Data Science",
      "Geo-Location",
      "Software"
    ]
  },
  {
    "id": "SIH26072",
    "title": "AIML based Nowcasting of thunderstorm and lightning using atmospheric observation including multiple radars, satellite, lightning and model data.",
    "organization": "Ministry of Earth Sciences (MoES)",
    "category": "Software",
    "theme": "Disaster Management",
    "domain": "Disaster Management",
    "tags": [
      "AI/ML",
      "Data Science",
      "Geo-Location",
      "Software"
    ]
  },
  {
    "id": "SIH26073",
    "title": "AI/ML-Based Intelligent Anomaly Detection for Automatic Weather Stations (AWS)",
    "organization": "Ministry of Earth Sciences (MoES)",
    "category": "Software",
    "theme": "Disaster Management",
    "domain": "Disaster Management",
    "tags": [
      "AI/ML",
      "Automation",
      "Software"
    ]
  },
  {
    "id": "SIH26074",
    "title": "Downscaling of weather forecast from Block level to Panchayat level: Inferring high-resolution plots/ data/ information from low-resolution plot /data /information /variables for agro-meteorological advisory services.",
    "organization": "Ministry of Earth Sciences (MoES)",
    "category": "Software",
    "theme": "Disaster Management",
    "domain": "Disaster Management",
    "tags": [
      "Data Science",
      "Software"
    ]
  },
  {
    "id": "SIH26075",
    "title": "Participants are invited to design and develop **CAPACITY CONNECT A Digital Capacity Building and Learning Management Portal** to support organizational training, competency development, and knowledge sharing through a centralized web-based platform.",
    "organization": "Ministry of Earth Sciences (MoES)",
    "category": "Software",
    "theme": "Smart Education",
    "domain": "Smart Education",
    "tags": [
      "Web",
      "EdTech",
      "Software"
    ]
  },
  {
    "id": "SIH26076",
    "title": "Development of personalized homepage for 'Mausam' mobile application:",
    "organization": "Ministry of Earth Sciences (MoES)",
    "category": "Software",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "Mobile App",
      "Software"
    ]
  },
  {
    "id": "SIH26077",
    "title": "AI-Driven Hyper-Local Early Warning System for Severe Weather Nowcasting",
    "organization": "Ministry of Earth Sciences (MoES)",
    "category": "Software",
    "theme": "Disaster Management",
    "domain": "Disaster Management",
    "tags": [
      "AI/ML",
      "Software"
    ]
  },
  {
    "id": "SIH26078",
    "title": "AI-Driven Spatio-Temporal Tracking of Extreme Weather Anomalies in Medium-Range Forecasts",
    "organization": "Ministry of Earth Sciences (MoES)",
    "category": "Software",
    "theme": "Disaster Management",
    "domain": "Disaster Management",
    "tags": [
      "AI/ML",
      "Software"
    ]
  },
  {
    "id": "SIH26079",
    "title": "AI-Based Forecast Bust Detection for Medium-Range Weather Forecasts",
    "organization": "Ministry of Earth Sciences (MoES)",
    "category": "Software",
    "theme": "Disaster Management",
    "domain": "Disaster Management",
    "tags": [
      "AI/ML",
      "Software"
    ]
  },
  {
    "id": "SIH26080",
    "title": "Regime-Aware AI Post-Processing of Monsoon Rainfall Forecasts",
    "organization": "Ministry of Earth Sciences (MoES)",
    "category": "Software",
    "theme": "Disaster Management",
    "domain": "Disaster Management",
    "tags": [
      "AI/ML",
      "Software"
    ]
  },
  {
    "id": "SIH26081",
    "title": "Hybrid AINWP Multi-Model Forecast Blending System",
    "organization": "Ministry of Earth Sciences (MoES)",
    "category": "Software",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "Miscellaneous",
      "Software"
    ]
  },
  {
    "id": "SIH26082",
    "title": "Air PollutionWeather Coupled Forecasting System (Delhi NCR Focus)",
    "organization": "Ministry of Earth Sciences (MoES)",
    "category": "Software",
    "theme": "Disaster Management",
    "domain": "Disaster Management",
    "tags": [
      "Disaster Management",
      "Software"
    ]
  },
  {
    "id": "SIH26083",
    "title": "Extreme Heatwave Early Warning and Human Thermal Stress Index",
    "organization": "Ministry of Earth Sciences (MoES)",
    "category": "Software",
    "theme": "Disaster Management",
    "domain": "Disaster Management",
    "tags": [
      "Disaster Management",
      "Software"
    ]
  },
  {
    "id": "SIH26084",
    "title": "Convective scale nowcasting for Thunderstorms, Hail & Cloudbursts (06 hr)",
    "organization": "Ministry of Earth Sciences (MoES)",
    "category": "Software",
    "theme": "Disaster Management",
    "domain": "Disaster Management",
    "tags": [
      "Cloud",
      "Software"
    ]
  },
  {
    "id": "SIH26085",
    "title": "Urban Flood Nowcasting System (Drainage and Rainfall Coupling)",
    "organization": "Ministry of Earth Sciences (MoES)",
    "category": "Software",
    "theme": "Disaster Management",
    "domain": "Disaster Management",
    "tags": [
      "Disaster Management",
      "Software"
    ]
  },
  {
    "id": "SIH26086",
    "title": "Hyperlocal Monsoon Onset & Break Prediction System (Block/Village Scale)",
    "organization": "Ministry of Earth Sciences (MoES)",
    "category": "Software",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "AI/ML",
      "Software"
    ]
  },
  {
    "id": "SIH26087",
    "title": "AI-Enabled Cooperative Capacity Building, ERP & Employment Ecosystem",
    "organization": "Ministry of Cooperation",
    "category": "Hardware",
    "theme": "Smart Education",
    "domain": "Smart Education",
    "tags": [
      "AI/ML",
      "EdTech",
      "Hardware"
    ]
  },
  {
    "id": "SIH26088",
    "title": "Multilingual Cooperative Governance & Legal Assistance Chatbot",
    "organization": "Ministry of Cooperation",
    "category": "Hardware",
    "theme": "Smart Automation",
    "domain": "Smart Automation",
    "tags": [
      "Automation",
      "Hardware"
    ]
  },
  {
    "id": "SIH26089",
    "title": "Cooperative Gig Services Platform for Household & Community Services",
    "organization": "Ministry of Cooperation",
    "category": "Software",
    "theme": "Smart Automation",
    "domain": "Smart Automation",
    "tags": [
      "Web",
      "Automation",
      "Software"
    ]
  },
  {
    "id": "SIH26090",
    "title": "AI-Driven Market Linkage and Smart Cataloging Mobile Application for Marginalized Artisans",
    "organization": "Ministry of Social Justice and Empowerment (MoSJE)",
    "category": "Software",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "AI/ML",
      "Mobile App",
      "Software"
    ]
  },
  {
    "id": "SIH26091",
    "title": "AI-Driven Hyper-Local Business Advisory and Financial Structuring Assistant for Rural Micro-Entrepreneurs",
    "organization": "Ministry of Social Justice and Empowerment (MoSJE)",
    "category": "Software",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "AI/ML",
      "Software"
    ]
  },
  {
    "id": "SIH26092",
    "title": "AI-Driven Scheme Matching for Marginalized Entrepreneurs",
    "organization": "Ministry of Social Justice and Empowerment (MoSJE)",
    "category": "Software",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "AI/ML",
      "Software"
    ]
  },
  {
    "id": "SIH26093",
    "title": "AI-Based Real-Time Stress and Trauma Assessment Module for Victims/Complainants Accessing NHAA (14566) and Integrated Portal",
    "organization": "Ministry of Social Justice and Empowerment (MoSJE)",
    "category": "Software",
    "theme": "Smart Automation",
    "domain": "Smart Automation",
    "tags": [
      "AI/ML",
      "Web",
      "Automation",
      "Software"
    ]
  },
  {
    "id": "SIH26094",
    "title": "AI-Powered Dynamic Mental Health Monitoring and Distress Prediction System for Victims of Atrocities",
    "organization": "Ministry of Social Justice and Empowerment (MoSJE)",
    "category": "Software",
    "theme": "MedTech / BioTech / HealthTech",
    "domain": "MedTech / BioTech / HealthTech",
    "tags": [
      "AI/ML",
      "IoT",
      "Healthcare",
      "Software"
    ]
  },
  {
    "id": "SIH26095",
    "title": "Smart Real-Time Monitoring & Inspection Mobile App",
    "organization": "Ministry of Social Justice and Empowerment (MoSJE)",
    "category": "Software",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "Mobile App",
      "Software"
    ]
  },
  {
    "id": "SIH26096",
    "title": "Digital Heritage Archive for Memorials, Manuscripts & Ambedkar: AI-Powered Institutional Archive and Audio-Visual Knowledge Platform",
    "organization": "Ministry of Social Justice and Empowerment (MoSJE)",
    "category": "Hardware",
    "theme": "Heritage & Culture",
    "domain": "Heritage & Culture",
    "tags": [
      "AI/ML",
      "Web",
      "Hardware"
    ]
  },
  {
    "id": "SIH26097",
    "title": "AI-Driven voice Assistant for livelihood Mapping and NSQF-Aligned Skilling Recommendations for SC Communities under GIA component of PM-AJAY",
    "organization": "Ministry of Social Justice and Empowerment (MoSJE)",
    "category": "Software",
    "theme": "Smart Education",
    "domain": "Smart Education",
    "tags": [
      "AI/ML",
      "EdTech",
      "Geo-Location",
      "Software"
    ]
  },
  {
    "id": "SIH26098",
    "title": "Development of a Low-Cost Precision Guidance and Smart Electronic Fuze System for a 155 mm Artillery Shell",
    "organization": "Ministry of Defence (MoD)",
    "category": "Hardware",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "Miscellaneous",
      "Hardware"
    ]
  },
  {
    "id": "SIH26099",
    "title": "AI-Driven Standardization and Harmonization of Material Codes Across CPSEs",
    "organization": "Ministry of Petroleum & Natural Gas",
    "category": "Software",
    "theme": "Smart Automation",
    "domain": "Smart Automation",
    "tags": [
      "AI/ML",
      "Automation",
      "Software"
    ]
  },
  {
    "id": "SIH26100",
    "title": "AI-Powered Integrated Bid Compliance Verification Platform for GeM Procurement",
    "organization": "Ministry of Petroleum & Natural Gas",
    "category": "Software",
    "theme": "Smart Automation",
    "domain": "Smart Automation",
    "tags": [
      "AI/ML",
      "Web",
      "Automation",
      "Software"
    ]
  },
  {
    "id": "SIH26101",
    "title": "Develop an AI enabled learning platform that identifies competency gaps, recommends personalized training through integration with the iGOT Karmayogi ecosystem, and capable of generating Quizzes and Multiple choice questions (MCQs) from uploaded learning materials to strengthen capacity building in India's Official Statistical System.",
    "organization": "MoSPI",
    "category": "Software",
    "theme": "Smart Education",
    "domain": "Smart Education",
    "tags": [
      "AI/ML",
      "Web",
      "EdTech",
      "Software"
    ]
  },
  {
    "id": "SIH26102",
    "title": "Development of an AI-powered system to detect anomalies, fraud, and inefficiencies in MPLAD Scheme implementation regd.",
    "organization": "MoSPI",
    "category": "Software",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "AI/ML",
      "Cybersecurity",
      "Software"
    ]
  },
  {
    "id": "SIH26103",
    "title": "Use case on web-based integrated project-monitoring platform",
    "organization": "MoSPI",
    "category": "Software",
    "theme": "Smart Automation",
    "domain": "Smart Automation",
    "tags": [
      "Web",
      "Automation",
      "Software"
    ]
  },
  {
    "id": "SIH26104",
    "title": "AI-Powered Real-Time Detection and Prevention of Voice Cloning Impersonation Attacks",
    "organization": "All India Council for Technical Education (AICTE)",
    "category": "Software",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "AI/ML",
      "Software"
    ]
  },
  {
    "id": "SIH26105",
    "title": "AI-Powered Continuous Cyber Risk Quantification and Investment Optimization Platform",
    "organization": "All India Council for Technical Education (AICTE)",
    "category": "Software",
    "theme": "Blockchain & Cybersecurity",
    "domain": "Blockchain & Cybersecurity",
    "tags": [
      "AI/ML",
      "Blockchain",
      "Web",
      "Software"
    ]
  },
  {
    "id": "SIH26106",
    "title": "AI-Powered Email Threat Detection, GeoLocation and Forensic Intelligence Platform",
    "organization": "All India Council for Technical Education (AICTE)",
    "category": "Software",
    "theme": "Blockchain & Cybersecurity",
    "domain": "Blockchain & Cybersecurity",
    "tags": [
      "AI/ML",
      "Blockchain",
      "Web",
      "Software"
    ]
  },
  {
    "id": "SIH26107",
    "title": "Al-powered Intelligent Assistant for Indian Standards and BIS Services for Industries and Consumers",
    "organization": "Ministry of Consumer Affairs, Food & Public Distribution",
    "category": "Software",
    "theme": "Smart Automation",
    "domain": "Smart Automation",
    "tags": [
      "AI/ML",
      "Automation",
      "Software"
    ]
  },
  {
    "id": "SIH26108",
    "title": "AI-Powered Recommendation Engine for Identifying Applicable Indian Standards for Procurement Specifications",
    "organization": "Ministry of Consumer Affairs, Food & Public Distribution",
    "category": "Software",
    "theme": "Smart Automation",
    "domain": "Smart Automation",
    "tags": [
      "AI/ML",
      "Automation",
      "Software"
    ]
  },
  {
    "id": "SIH26109",
    "title": "Al-Based Predictive Modelling for Early Forecasting of Bovine Mastitis in lndian Dairy Farms",
    "organization": "Ministry of Fisheries, Animal Husbandry & Dairying",
    "category": "Hardware",
    "theme": "Agriculture, FoodTech & Rural Development",
    "domain": "Agriculture, FoodTech & Rural Development",
    "tags": [
      "AI/ML",
      "Hardware"
    ]
  },
  {
    "id": "SIH26110",
    "title": "Development of a Low-Cost Light-weight Milk Chilling Can for Small-Scale Dairy Farmers",
    "organization": "Ministry of Fisheries, Animal Husbandry & Dairying",
    "category": "Hardware",
    "theme": "Agriculture, FoodTech & Rural Development",
    "domain": "Agriculture, FoodTech & Rural Development",
    "tags": [
      "Agriculture, FoodTec",
      "Hardware"
    ]
  },
  {
    "id": "SIH26111",
    "title": "Smart Al-Enabled Rapid Feed and Silage Quality Testing System for Dairy Farmers",
    "organization": "Ministry of Fisheries, Animal Husbandry & Dairying",
    "category": "Software",
    "theme": "Agriculture, FoodTech & Rural Development",
    "domain": "Agriculture, FoodTech & Rural Development",
    "tags": [
      "AI/ML",
      "Software"
    ]
  },
  {
    "id": "SIH26112",
    "title": "Design and Develop a Modular Autonomous Mobile Robot (AMR) Platform for Smart Warehouse Automation",
    "organization": "Autodesk",
    "category": "Hardware",
    "theme": "Robotics and Drones",
    "domain": "Robotics and Drones",
    "tags": [
      "IoT",
      "Mobile App",
      "Web",
      "Hardware"
    ]
  },
  {
    "id": "SIH26113",
    "title": "Human augmentation technologies are transforming healthcare,rehabilitation, industrial ergonomics, assistive living, sports, and personal mobility by improving human capabilities and enhancing quality of life.",
    "organization": "Autodesk",
    "category": "Hardware",
    "theme": "MedTech / BioTech / HealthTech",
    "domain": "MedTech / BioTech / HealthTech",
    "tags": [
      "IoT",
      "Healthcare",
      "Hardware"
    ]
  },
  {
    "id": "SIH26114",
    "title": "Smart City Site Planning using Autodesk Forma Site Design",
    "organization": "Autodesk",
    "category": "Software",
    "theme": "Smart Automation",
    "domain": "Smart Automation",
    "tags": [
      "Automation",
      "Software"
    ]
  },
  {
    "id": "SIH26115",
    "title": "Design and Develop a Smart Mobile Medical-Waste Collection and Segregation System",
    "organization": "Autodesk",
    "category": "Software",
    "theme": "MedTech / BioTech / HealthTech",
    "domain": "MedTech / BioTech / HealthTech",
    "tags": [
      "IoT",
      "Mobile App",
      "Healthcare",
      "Software"
    ]
  },
  {
    "id": "SIH26116",
    "title": "Urban Mixed-Use Design Challenge-Design a centrally located mixed-use building in Autodesk Revit with commercial spaces (Ground + 1st floor) and residential units (up to 8 floors). 1 Level of Basement (Car Parking + EV Charging), Total (B+G+9)(Note: Plot size and all required dimensions may be assumed by students (in mm units).",
    "organization": "Autodesk",
    "category": "Software",
    "theme": "Smart Education",
    "domain": "Smart Education",
    "tags": [
      "EdTech",
      "Software"
    ]
  },
  {
    "id": "SIH26117",
    "title": "Sovereign On-Premise Agentic AI Workbench using Open-Weight Multimodal LLMs for Confidential Industrial Work",
    "organization": "Mangalore Refinery and Petrochemicals Limited (MRPL)",
    "category": "Software",
    "theme": "Smart Automation",
    "domain": "Smart Automation",
    "tags": [
      "AI/ML",
      "Automation",
      "Software"
    ]
  },
  {
    "id": "SIH26118",
    "title": "Passive Colorimetric H2S Exposure-Dosimeter Wristband with AI-Based Quantitative Reading",
    "organization": "Mangalore Refinery and Petrochemicals Limited (MRPL)",
    "category": "Hardware",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "AI/ML",
      "Hardware"
    ]
  },
  {
    "id": "SIH26119",
    "title": "Indigenous GPU-Accelerated Optimization Solver (Sovereign Alternative to Express / CEPLEX)",
    "organization": "Mangalore Refinery and Petrochemicals Limited (MRPL)",
    "category": "Software",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "Miscellaneous",
      "Software"
    ]
  },
  {
    "id": "SIH26120",
    "title": "Digital Twin for Well-to-Surface Optimization of Cyclic Steam Stimulation (CSS) and Sucker Rod Pump (SRP) Operations for Heavy Oil Wells of Baghewala Field.",
    "organization": "Oil India Limited",
    "category": "Software",
    "theme": "Smart Automation",
    "domain": "Smart Automation",
    "tags": [
      "Automation",
      "Software"
    ]
  },
  {
    "id": "SIH26121",
    "title": "eRTMAC-NWIS (Nearby Wells Intelligence System): An AI-Powered Offset Well Knowledge and Decision Support Platform for Drilling Operations",
    "organization": "Oil India Limited",
    "category": "Software",
    "theme": "Smart Automation",
    "domain": "Smart Automation",
    "tags": [
      "AI/ML",
      "Web",
      "Automation",
      "Software"
    ]
  },
  {
    "id": "SIH26122",
    "title": "Intelligent Data Capture & Schedule-Linking Layer for Infrastructure Project Management: Real-Time Actual Progress Tracking (Planning-to-Execution Bridge)",
    "organization": "Oil India Limited",
    "category": "Software",
    "theme": "Smart Automation",
    "domain": "Smart Automation",
    "tags": [
      "AI/ML",
      "Data Science",
      "Automation",
      "Software"
    ]
  },
  {
    "id": "SIH26123",
    "title": "Edge-AI Based Distributed Fleet Coordination for Autonomous Mobile Robots (AMRs) in Smart Warehouses",
    "organization": "Bharat Electronics Limited",
    "category": "Software",
    "theme": "Robotics and Drones",
    "domain": "Robotics and Drones",
    "tags": [
      "AI/ML",
      "IoT",
      "Mobile App",
      "Software"
    ]
  },
  {
    "id": "SIH26124",
    "title": "AI-Powered Mobile Urban Intelligence Platform Using Public Transport Fleet",
    "organization": "Bharat Electronics Limited",
    "category": "Software",
    "theme": "Fitness & Sports",
    "domain": "Fitness & Sports",
    "tags": [
      "AI/ML",
      "Mobile App",
      "Web",
      "Software"
    ]
  },
  {
    "id": "SIH26125",
    "title": "Blockchain-Based Secure Platform for Identity,Access Control, and Digital Asset Management",
    "organization": "Bharat Electronics Limited",
    "category": "Software",
    "theme": "Blockchain & Cybersecurity",
    "domain": "Blockchain & Cybersecurity",
    "tags": [
      "Blockchain",
      "Web",
      "Cybersecurity",
      "Software"
    ]
  },
  {
    "id": "SIH26126",
    "title": "Vision Based Autonomous Navigation for Unmanned Ground Vehicle for Outdoor environment",
    "organization": "Bharat Electronics Limited",
    "category": "Software",
    "theme": "Robotics and Drones",
    "domain": "Robotics and Drones",
    "tags": [
      "IoT",
      "Automation",
      "Image Processing",
      "Software"
    ]
  },
  {
    "id": "SIH26127",
    "title": "City-Wide AI Engine for Multi-Camera ANPR Trajectory Tracking and Urban Traffic Analytics",
    "organization": "Bharat Electronics Limited",
    "category": "Software",
    "theme": "Transportation & Logistics",
    "domain": "Transportation & Logistics",
    "tags": [
      "AI/ML",
      "Data Science",
      "Geo-Location",
      "Software"
    ]
  },
  {
    "id": "SIH26128",
    "title": "Efficient systems for early detection,prevention,and management of livestock diseases and animal health issues",
    "organization": "Government Of Maharashtra",
    "category": "Software",
    "theme": "Agriculture, FoodTech & Rural Development",
    "domain": "Agriculture, FoodTech & Rural Development",
    "tags": [
      "Healthcare",
      "Software"
    ]
  },
  {
    "id": "SIH26129",
    "title": "System integration and interoperability among government digital platforms,resulting in fragmented service delivery",
    "organization": "Government Of Maharashtra",
    "category": "Software",
    "theme": "Smart Automation",
    "domain": "Smart Automation",
    "tags": [
      "Web",
      "Automation",
      "Software"
    ]
  },
  {
    "id": "SIH26130",
    "title": "Efficiency in streamlining industrial approvals,compliance processes,and access to government support services",
    "organization": "Government Of Maharashtra",
    "category": "Software",
    "theme": "Smart Automation",
    "domain": "Smart Automation",
    "tags": [
      "Automation",
      "Software"
    ]
  },
  {
    "id": "SIH26131",
    "title": "Early detection and management of crop diseases and pest infestations",
    "organization": "Government Of Maharashtra",
    "category": "Software",
    "theme": "Agriculture, FoodTech & Rural Development",
    "domain": "Agriculture, FoodTech & Rural Development",
    "tags": [
      "Healthcare",
      "Software"
    ]
  },
  {
    "id": "SIH26132",
    "title": "Strengthening market linkages and price discovery for farmers",
    "organization": "Government Of Maharashtra",
    "category": "Software",
    "theme": "Agriculture, FoodTech & Rural Development",
    "domain": "Agriculture, FoodTech & Rural Development",
    "tags": [
      "Agriculture, FoodTec",
      "Software"
    ]
  },
  {
    "id": "SIH26133",
    "title": "Accessibility and quality of public healthcare services,particularly in rural and underserved areas",
    "organization": "Government Of Maharashtra",
    "category": "Software",
    "theme": "MedTech / BioTech / HealthTech",
    "domain": "MedTech / BioTech / HealthTech",
    "tags": [
      "IoT",
      "Healthcare",
      "Software"
    ]
  },
  {
    "id": "SIH26134",
    "title": "Challenges in aligning skill development programs with industry requirements and emerging job market demands",
    "organization": "Government Of Maharashtra",
    "category": "Software",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "Miscellaneous",
      "Software"
    ]
  },
  {
    "id": "SIH26135",
    "title": "Difficulties in tracking employment outcomes,skill gaps, and the impact of skilling initiatives",
    "organization": "Government Of Maharashtra",
    "category": "Software",
    "theme": "Smart Education",
    "domain": "Smart Education",
    "tags": [
      "EdTech",
      "Software"
    ]
  },
  {
    "id": "SIH26136",
    "title": "Startup friendly public procurement mechanism that enables government departments to identify,pilot, procure,and scale innovative solutions from eligible startups",
    "organization": "Government Of Maharashtra",
    "category": "Software",
    "theme": "Smart Automation",
    "domain": "Smart Automation",
    "tags": [
      "Automation",
      "Software"
    ]
  },
  {
    "id": "SIH26137",
    "title": "Quantum-Inspired Intelligent Traffic Route Optimization in Transportation Systems Using Metaheuristic Optimization",
    "organization": "Egreen Quanta",
    "category": "Software",
    "theme": "Fitness & Sports",
    "domain": "Fitness & Sports",
    "tags": [
      "AI/ML",
      "Software"
    ]
  },
  {
    "id": "SIH26138",
    "title": "Quantum-Inspired Fuel Consumption Prediction and Green Fleet Optimization",
    "organization": "Egreen Quanta",
    "category": "Software",
    "theme": "Smart Vehicles",
    "domain": "Smart Vehicles",
    "tags": [
      "AI/ML",
      "Software"
    ]
  },
  {
    "id": "SIH26139",
    "title": "Hybrid Quantum Machine Learning Platform for Early Disease Detection",
    "organization": "Egreen Quanta",
    "category": "Software",
    "theme": "MedTech / BioTech / HealthTech",
    "domain": "MedTech / BioTech / HealthTech",
    "tags": [
      "AI/ML",
      "IoT",
      "Web",
      "Software"
    ]
  },
  {
    "id": "SIH26140",
    "title": "AI-Based Interactive Quantum Algorithm Learning Platform",
    "organization": "Egreen Quanta",
    "category": "Software",
    "theme": "Smart Education",
    "domain": "Smart Education",
    "tags": [
      "AI/ML",
      "Web",
      "EdTech",
      "Software"
    ]
  },
  {
    "id": "SIH26141",
    "title": "Quantum-Inspired Cyber Threat Detection for Digital Signature Security",
    "organization": "Egreen Quanta",
    "category": "Software",
    "theme": "Blockchain & Cybersecurity",
    "domain": "Blockchain & Cybersecurity",
    "tags": [
      "Blockchain",
      "Cybersecurity",
      "Software"
    ]
  },
  {
    "id": "SIH26142",
    "title": "Deep Learning Based Super Resolution Mapping (SRM) from Medium Resolution Satellite Imageries",
    "organization": "National Technical Research Organisation (NTRO)",
    "category": "Software",
    "theme": "Smart Education",
    "domain": "Smart Education",
    "tags": [
      "AI/ML",
      "EdTech",
      "Geo-Location",
      "Software"
    ]
  },
  {
    "id": "SIH26143",
    "title": "Leveraging satellite imagery to determine Oil spills at sea along with AIS data correlations to identify vessel responsible for the spill.",
    "organization": "National Technical Research Organisation (NTRO)",
    "category": "Software",
    "theme": "Space Technology",
    "domain": "Space Technology",
    "tags": [
      "Data Science",
      "Geo-Location",
      "Image Processing",
      "Software"
    ]
  },
  {
    "id": "SIH26144",
    "title": "Design & Development of a High-Sensitivity Micro barometer Infrasound sensor",
    "organization": "National Technical Research Organisation (NTRO)",
    "category": "Hardware",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "IoT",
      "Hardware"
    ]
  },
  {
    "id": "SIH26145",
    "title": "AI-Based Detection of Cyber Threats in Unidirectional IP Traffic",
    "organization": "National Technical Research Organisation (NTRO)",
    "category": "Software",
    "theme": "Blockchain & Cybersecurity",
    "domain": "Blockchain & Cybersecurity",
    "tags": [
      "AI/ML",
      "Blockchain",
      "Cybersecurity",
      "Software"
    ]
  },
  {
    "id": "SIH26146",
    "title": "AI-Powered Monitoring & Analysis of Bitcoin Transaction Traffic",
    "organization": "National Technical Research Organisation (NTRO)",
    "category": "Software",
    "theme": "Transportation & Logistics",
    "domain": "Transportation & Logistics",
    "tags": [
      "AI/ML",
      "Geo-Location",
      "Software"
    ]
  },
  {
    "id": "SIH26147",
    "title": "Automated model for analysis of .IQ and .wav files along with signal parameter extraction",
    "organization": "National Technical Research Organisation (NTRO)",
    "category": "Software",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "Automation",
      "Software"
    ]
  },
  {
    "id": "SIH26148",
    "title": "Creation of scripts/functions with new programming language to commence Computer & Network forensic analysis without triggering security solutions",
    "organization": "National Technical Research Organisation (NTRO)",
    "category": "Software",
    "theme": "Blockchain & Cybersecurity",
    "domain": "Blockchain & Cybersecurity",
    "tags": [
      "Blockchain",
      "Cybersecurity",
      "Software"
    ]
  },
  {
    "id": "SIH26149",
    "title": "Design and Development of an Integrated Secure Data Erasure and Advanced File Recovery Tool for Digital Forensics and Data Sanitization",
    "organization": "National Technical Research Organisation (NTRO)",
    "category": "Software",
    "theme": "Blockchain & Cybersecurity",
    "domain": "Blockchain & Cybersecurity",
    "tags": [
      "Blockchain",
      "Data Science",
      "Cybersecurity",
      "Software"
    ]
  },
  {
    "id": "SIH26150",
    "title": "Development of a Multi-Vendor DVR/NVR Forensic Analysis Tool for Standardized Acquisition, Recovery, and Analysis of Surveillance Evidence.",
    "organization": "National Technical Research Organisation (NTRO)",
    "category": "Software",
    "theme": "Blockchain & Cybersecurity",
    "domain": "Blockchain & Cybersecurity",
    "tags": [
      "Blockchain",
      "Cybersecurity",
      "Software"
    ]
  },
  {
    "id": "SIH26151",
    "title": "Dark web threat actor de-anonymization",
    "organization": "National Technical Research Organisation (NTRO)",
    "category": "Software",
    "theme": "Blockchain & Cybersecurity",
    "domain": "Blockchain & Cybersecurity",
    "tags": [
      "Blockchain",
      "Web",
      "Cybersecurity",
      "Software"
    ]
  },
  {
    "id": "SIH26152",
    "title": "Social Media Analytics",
    "organization": "National Technical Research Organisation (NTRO)",
    "category": "Software",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "Data Science",
      "Software"
    ]
  },
  {
    "id": "SIH26153",
    "title": "AI based Network Attack Forecasting from Network Traffic Data",
    "organization": "National Technical Research Organisation (NTRO)",
    "category": "Software",
    "theme": "Blockchain & Cybersecurity",
    "domain": "Blockchain & Cybersecurity",
    "tags": [
      "AI/ML",
      "Blockchain",
      "Data Science",
      "Software"
    ]
  },
  {
    "id": "SIH26154",
    "title": "Gen AI Platform for Automated Content Transformation",
    "organization": "National Technical Research Organisation (NTRO)",
    "category": "Software",
    "theme": "Smart Automation",
    "domain": "Smart Automation",
    "tags": [
      "AI/ML",
      "Web",
      "Automation",
      "Software"
    ]
  },
  {
    "id": "SIH26155",
    "title": "AI-Driven Multi-Vendor Network Security Compliance Auditor",
    "organization": "National Technical Research Organisation (NTRO)",
    "category": "Software",
    "theme": "Blockchain & Cybersecurity",
    "domain": "Blockchain & Cybersecurity",
    "tags": [
      "AI/ML",
      "Blockchain",
      "Cybersecurity",
      "Software"
    ]
  },
  {
    "id": "SIH26156",
    "title": "Universal Log Pre-processing Framework",
    "organization": "National Technical Research Organisation (NTRO)",
    "category": "Software",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "Miscellaneous",
      "Software"
    ]
  },
  {
    "id": "SIH26157",
    "title": "Supervisory Analytics Tool for SOC Assessment (SAT-SA)",
    "organization": "National Technical Research Organisation (NTRO)",
    "category": "Software",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "Data Science",
      "Software"
    ]
  },
  {
    "id": "SIH26158",
    "title": "Single-Pass Drone Video to Accurate 3D Model Generation System",
    "organization": "National Technical Research Organisation (NTRO)",
    "category": "Software",
    "theme": "Robotics and Drones",
    "domain": "Robotics and Drones",
    "tags": [
      "IoT",
      "Automation",
      "Image Processing",
      "Software"
    ]
  },
  {
    "id": "SIH26159",
    "title": "SecureMailScope: AI-Assisted Cryptographic Security Posture Assessment for Secure Email Communications",
    "organization": "National Technical Research Organisation (NTRO)",
    "category": "Software",
    "theme": "Blockchain & Cybersecurity",
    "domain": "Blockchain & Cybersecurity",
    "tags": [
      "AI/ML",
      "Blockchain",
      "Cybersecurity",
      "Software"
    ]
  },
  {
    "id": "SIH26160",
    "title": "AI-Powered IPsec VPN Protocol Analyzer and Security Assessment Framework",
    "organization": "National Technical Research Organisation (NTRO)",
    "category": "Software",
    "theme": "Blockchain & Cybersecurity",
    "domain": "Blockchain & Cybersecurity",
    "tags": [
      "AI/ML",
      "Blockchain",
      "Cybersecurity",
      "Software"
    ]
  },
  {
    "id": "SIH26161",
    "title": "Dam Break Inundation Modelling Using Hydrodynamic Modelling of any River",
    "organization": "National Technical Research Organisation (NTRO)",
    "category": "Software",
    "theme": "Disaster Management",
    "domain": "Disaster Management",
    "tags": [
      "Disaster Management",
      "Software"
    ]
  },
  {
    "id": "SIH26162",
    "title": "AI-Based Detection and Classification of Industrial Fires and Persistent Thermal Sources Using NASA FIRMS, OSM & Satellite Data",
    "organization": "National Technical Research Organisation (NTRO)",
    "category": "Software",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "AI/ML",
      "Data Science",
      "Geo-Location",
      "Software"
    ]
  },
  {
    "id": "SIH26163",
    "title": "Security Assessment of the World Monitor application",
    "organization": "National Technical Research Organisation (NTRO)",
    "category": "Software",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "Cybersecurity",
      "Software"
    ]
  },
  {
    "id": "SIH26164",
    "title": "Enterprise Cryptographic Discovery & Analysis Tool (ECDAT)",
    "organization": "National Technical Research Organisation (NTRO)",
    "category": "Software",
    "theme": "Blockchain & Cybersecurity",
    "domain": "Blockchain & Cybersecurity",
    "tags": [
      "Blockchain",
      "Cybersecurity",
      "Software"
    ]
  },
  {
    "id": "SIH26165",
    "title": "AI/NLP Engine to Detect Serious Injury & Fatality (SIF) Precursors in OIL's Unsafe-Act/Unsafe-Condition and Near-Miss Reports",
    "organization": "Oil India Limited",
    "category": "Software",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "AI/ML",
      "Software"
    ]
  },
  {
    "id": "SIH26166",
    "title": "Multi-modal, Sun angle and scale invariant image correspondence using Chandrayaan-2 optical images (OHRC, TMC and IIRS)",
    "organization": "Indian Space Research Organisation(ISRO)",
    "category": "Software",
    "theme": "Space Technology",
    "domain": "Space Technology",
    "tags": [
      "Image Processing",
      "Software"
    ]
  },
  {
    "id": "SIH26167",
    "title": "SatQuery AI - An Interactive Vision-Language Assistant for Multimodal Remote Sensing Image Analysis through Text Queries",
    "organization": "Indian Space Research Organisation(ISRO)",
    "category": "Software",
    "theme": "Space Technology",
    "domain": "Space Technology",
    "tags": [
      "AI/ML",
      "Image Processing",
      "Software"
    ]
  },
  {
    "id": "SIH26168",
    "title": "AI-ML based Intelligent Dead Reckoning system for seamless navigation",
    "organization": "Indian Space Research Organisation(ISRO)",
    "category": "Software",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "AI/ML",
      "Software"
    ]
  },
  {
    "id": "SIH26169",
    "title": "Development of an AI-Based Virtual Camera Tracking System for Coarse Alignment of Mobile Free Space Optical Communication (FSOC) Terminals",
    "organization": "Indian Space Research Organisation(ISRO)",
    "category": "Software",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "AI/ML",
      "Mobile App",
      "Image Processing",
      "Software"
    ]
  },
  {
    "id": "SIH26170",
    "title": "AI-Driven Anomaly Detection in Component Burn-In & Screening",
    "organization": "Indian Space Research Organisation(ISRO)",
    "category": "Software",
    "theme": "Smart Automation",
    "domain": "Smart Automation",
    "tags": [
      "AI/ML",
      "Automation",
      "Software"
    ]
  },
  {
    "id": "SIH26171",
    "title": "On-device Visual Perception for Light-weight Browser Agents",
    "organization": "Indian Space Research Organisation(ISRO)",
    "category": "Software",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "Miscellaneous",
      "Software"
    ]
  },
  {
    "id": "SIH26172",
    "title": "Low Latency and Efficient Voice Activator for Edge Devices",
    "organization": "Indian Space Research Organisation(ISRO)",
    "category": "Hardware",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "Miscellaneous",
      "Hardware"
    ]
  },
  {
    "id": "SIH26173",
    "title": "iTantra -Indian Multilingual TTS & STT Aided Neural Transceiver Radio Access for low bitrate links",
    "organization": "Indian Space Research Organisation(ISRO)",
    "category": "Software",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "AI/ML",
      "Software"
    ]
  },
  {
    "id": "SIH26174",
    "title": "AI Human Activity Recognition for On-board BAS Experiments",
    "organization": "Indian Space Research Organisation(ISRO)",
    "category": "Software",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "AI/ML",
      "Software"
    ]
  },
  {
    "id": "SIH26175",
    "title": "DepthWizard - Single-View Height Estimation and 3D Flythrough",
    "organization": "Indian Space Research Organisation(ISRO)",
    "category": "Software",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "Miscellaneous",
      "Software"
    ]
  },
  {
    "id": "SIH26176",
    "title": "ORCA Marine EcOsystem Reasoning with Collaborative Agents",
    "organization": "Indian Space Research Organisation(ISRO)",
    "category": "Software",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "Miscellaneous",
      "Software"
    ]
  },
  {
    "id": "SIH26177",
    "title": "A deployable AI-powered autonomous drone that aids search-and-rescue operations by detecting people and hazards, thereby improving responder safety and reducing victim discovery time.",
    "organization": "Qualcomm Inc",
    "category": "Hardware",
    "theme": "Robotics and Drones",
    "domain": "Robotics and Drones",
    "tags": [
      "AI/ML",
      "IoT",
      "Automation",
      "Hardware"
    ]
  },
  {
    "id": "SIH26178",
    "title": "A resilient, AI-powered environmental monitoring network that provides early detection, localized intelligence, and actionable alerts for floods, forest fires, pollution events, and other environmental hazards common in India, enabling authorities and communities to shift from reactive disaster response to proactive risk prevention.",
    "organization": "Qualcomm Inc",
    "category": "Hardware",
    "theme": "Disaster Management",
    "domain": "Disaster Management",
    "tags": [
      "AI/ML",
      "Hardware"
    ]
  },
  {
    "id": "SIH26179",
    "title": "To build an AI-powered retail intelligence platform that delivers real-time shopper analytics, automated inventory visibility, and proactive queue management through on-device AI,enabling retailers to reduce stock-outs, improve customer experience, optimize staffing, and increase operational efficiency while maintaining privacy and minimizing cloud dependency.",
    "organization": "Qualcomm Inc",
    "category": "Hardware",
    "theme": "Smart Automation",
    "domain": "Smart Automation",
    "tags": [
      "AI/ML",
      "Data Science",
      "Web",
      "Hardware"
    ]
  },
  {
    "id": "SIH26180",
    "title": "A field-deployable AI-powered Smart Farming Assistant that helps farmers detect crop diseases, pests, nutrient deficiencies, and irrigation needs at an early stage, while improving resilience against droughts, floods, heat waves, and other agricultural risks common in India. The solution should enable higher yields, lower input costs, more efficient water usage, and faster response to emerging threats through real-time on-device intelligence.",
    "organization": "Qualcomm Inc",
    "category": "Hardware",
    "theme": "Disaster Management",
    "domain": "Disaster Management",
    "tags": [
      "AI/ML",
      "Healthcare",
      "Hardware"
    ]
  },
  {
    "id": "SIH26181",
    "title": "A secure, AI-powered Personal Health Companion that delivers real-time, privacy-preserving health monitoring and early warning capabilities, helping individuals recognize health risks before they become emergencies. The solution should improve resilience during heat waves, floods, pollution events, and other disasters common in India while enabling continuous health support through on-device intelligence.",
    "organization": "Qualcomm Inc",
    "category": "Hardware",
    "theme": "MedTech / BioTech / HealthTech",
    "domain": "MedTech / BioTech / HealthTech",
    "tags": [
      "AI/ML",
      "IoT",
      "Cybersecurity",
      "Hardware"
    ]
  },
  {
    "id": "SIH26182",
    "title": "Automated Attribution of Unknown Cryptocurrency Wallets to Nearest Virtual Asset Service Providers (VASPs) through Blockchain Intelligence APIs",
    "organization": "Ministry of Home Affairs",
    "category": "Software",
    "theme": "Blockchain & Cybersecurity",
    "domain": "Blockchain & Cybersecurity",
    "tags": [
      "AI/ML",
      "Blockchain",
      "Automation",
      "Software"
    ]
  },
  {
    "id": "SIH26183",
    "title": "Real-Time Identification of Fraud-Linked Cryptocurrency Exchanges from Victim-Reported Suspect Wallet Addresses through Automated Blockchain Analytics",
    "organization": "Ministry of Home Affairs",
    "category": "Software",
    "theme": "Blockchain & Cybersecurity",
    "domain": "Blockchain & Cybersecurity",
    "tags": [
      "Blockchain",
      "Data Science",
      "Automation",
      "Software"
    ]
  },
  {
    "id": "SIH26184",
    "title": "Development of a Predictive Analytics Framework for Cybercrime Complaints to Forecast Likely Cash Withdrawal Locations in Advance, Enabling Generation of Actionable Intelligence for Timely and Proactive Cybercrime Intervention.",
    "organization": "Ministry of Home Affairs",
    "category": "Software",
    "theme": "Blockchain & Cybersecurity",
    "domain": "Blockchain & Cybersecurity",
    "tags": [
      "AI/ML",
      "Blockchain",
      "Data Science",
      "Software"
    ]
  },
  {
    "id": "SIH26185",
    "title": "Helmet mounted conformal antenna for tactical communications in urban CQB environments.",
    "organization": "Ministry of Home Affairs",
    "category": "Hardware",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "Miscellaneous",
      "Hardware"
    ]
  },
  {
    "id": "SIH26186",
    "title": "AI-Based Predictive Personnel Stress and Welfare Monitoring System for Uniformed Forces",
    "organization": "Ministry of Home Affairs",
    "category": "Software",
    "theme": "MedTech / BioTech / HealthTech",
    "domain": "MedTech / BioTech / HealthTech",
    "tags": [
      "AI/ML",
      "IoT",
      "Healthcare",
      "Software"
    ]
  },
  {
    "id": "SIH26187",
    "title": "AI-Based Intelligent Video Analytics Platform for Border Surveillance using existing CCTV Infrastructure.",
    "organization": "Ministry of Home Affairs",
    "category": "Software",
    "theme": "Smart Automation",
    "domain": "Smart Automation",
    "tags": [
      "AI/ML",
      "Data Science",
      "Web",
      "Software"
    ]
  },
  {
    "id": "SIH26188",
    "title": "Al-Based Fake Identity & Document Screening System",
    "organization": "Ministry of Home Affairs",
    "category": "Software",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "AI/ML",
      "Software"
    ]
  },
  {
    "id": "SIH26189",
    "title": "AI-Powered Criminal Network Analysis System",
    "organization": "Ministry of Home Affairs",
    "category": "Software",
    "theme": "Blockchain & Cybersecurity",
    "domain": "Blockchain & Cybersecurity",
    "tags": [
      "AI/ML",
      "Blockchain",
      "Cybersecurity",
      "Software"
    ]
  },
  {
    "id": "SIH26190",
    "title": "Secure Digital Document Management System for Legal and Investigation Documents",
    "organization": "Ministry of Home Affairs",
    "category": "Software",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "Cybersecurity",
      "Software"
    ]
  },
  {
    "id": "SIH26191",
    "title": "Intelligent Identification of Hazard-Based Red Zones, Carrying Capacity Assessment, and Immediate Relocation Needs for Vulnerable Habitations",
    "organization": "Ministry of Home Affairs",
    "category": "Software",
    "theme": "Disaster Management",
    "domain": "Disaster Management",
    "tags": [
      "AI/ML",
      "Geo-Location",
      "Software"
    ]
  },
  {
    "id": "SIH26192",
    "title": "Flash Flood Prediction System for Hilly Regions using Multi-Source Data Theme",
    "organization": "Ministry of Home Affairs",
    "category": "Software",
    "theme": "Disaster Management",
    "domain": "Disaster Management",
    "tags": [
      "AI/ML",
      "Data Science",
      "Software"
    ]
  },
  {
    "id": "SIH26193",
    "title": "Student Innovation",
    "organization": "AICTE",
    "category": "Software",
    "theme": "Smart Resource Conservation",
    "domain": "Smart Resource Conservation",
    "tags": [
      "EdTech",
      "Software"
    ]
  },
  {
    "id": "SIH26194",
    "title": "Student Innovation",
    "organization": "AICTE",
    "category": "Software",
    "theme": "Fitness & Sports",
    "domain": "Fitness & Sports",
    "tags": [
      "EdTech",
      "Software"
    ]
  },
  {
    "id": "SIH26195",
    "title": "Student Innovation",
    "organization": "AICTE",
    "category": "Software",
    "theme": "Heritage & Culture",
    "domain": "Heritage & Culture",
    "tags": [
      "EdTech",
      "Software"
    ]
  },
  {
    "id": "SIH26196",
    "title": "Student Innovation",
    "organization": "AICTE",
    "category": "Software",
    "theme": "MedTech / BioTech / HealthTech",
    "domain": "MedTech / BioTech / HealthTech",
    "tags": [
      "IoT",
      "Healthcare",
      "EdTech",
      "Software"
    ]
  },
  {
    "id": "SIH26197",
    "title": "Student Innovation",
    "organization": "AICTE",
    "category": "Software",
    "theme": "Agriculture, FoodTech & Rural Development",
    "domain": "Agriculture, FoodTech & Rural Development",
    "tags": [
      "EdTech",
      "Software"
    ]
  },
  {
    "id": "SIH26198",
    "title": "Student Innovation",
    "organization": "AICTE",
    "category": "Software",
    "theme": "Transportation & Logistics",
    "domain": "Transportation & Logistics",
    "tags": [
      "EdTech",
      "Geo-Location",
      "Software"
    ]
  },
  {
    "id": "SIH26199",
    "title": "Student Innovation",
    "organization": "AICTE",
    "category": "Software",
    "theme": "Fitness & Sports",
    "domain": "Fitness & Sports",
    "tags": [
      "EdTech",
      "Software"
    ]
  },
  {
    "id": "SIH26200",
    "title": "Student Innovation",
    "organization": "AICTE",
    "category": "Software",
    "theme": "MedTech / BioTech / HealthTech",
    "domain": "MedTech / BioTech / HealthTech",
    "tags": [
      "IoT",
      "Healthcare",
      "EdTech",
      "Software"
    ]
  },
  {
    "id": "SIH26201",
    "title": "Student Innovation",
    "organization": "AICTE",
    "category": "Software",
    "theme": "Smart Resource Conservation",
    "domain": "Smart Resource Conservation",
    "tags": [
      "EdTech",
      "Software"
    ]
  },
  {
    "id": "SIH26202",
    "title": "Student Innovation",
    "organization": "AICTE",
    "category": "Software",
    "theme": "Travel & Tourism",
    "domain": "Travel & Tourism",
    "tags": [
      "EdTech",
      "Software"
    ]
  },
  {
    "id": "SIH26203",
    "title": "Student Innovation",
    "organization": "AICTE",
    "category": "Software",
    "theme": "Renewable / Sustainable Energy",
    "domain": "Renewable / Sustainable Energy",
    "tags": [
      "EdTech",
      "Software"
    ]
  },
  {
    "id": "SIH26204",
    "title": "Student Innovation",
    "organization": "AICTE",
    "category": "Software",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "EdTech",
      "Software"
    ]
  },
  {
    "id": "SIH26205",
    "title": "Student Innovation",
    "organization": "AICTE",
    "category": "Software",
    "theme": "Smart Education",
    "domain": "Smart Education",
    "tags": [
      "EdTech",
      "Software"
    ]
  },
  {
    "id": "SIH26206",
    "title": "Student Innovation",
    "organization": "AICTE",
    "category": "Software",
    "theme": "Disaster Management",
    "domain": "Disaster Management",
    "tags": [
      "EdTech",
      "Software"
    ]
  },
  {
    "id": "SIH26207",
    "title": "Student Innovation",
    "organization": "AICTE",
    "category": "Software",
    "theme": "Travel & Tourism",
    "domain": "Travel & Tourism",
    "tags": [
      "EdTech",
      "Software"
    ]
  },
  {
    "id": "SIH26208",
    "title": "Student Innovation",
    "organization": "AICTE",
    "category": "Software",
    "theme": "Heritage & Culture",
    "domain": "Heritage & Culture",
    "tags": [
      "EdTech",
      "Software"
    ]
  },
  {
    "id": "SIH26209",
    "title": "Student Innovation",
    "organization": "AICTE",
    "category": "Software",
    "theme": "Space Technology",
    "domain": "Space Technology",
    "tags": [
      "EdTech",
      "Software"
    ]
  },
  {
    "id": "SIH26210",
    "title": "Student Innovation",
    "organization": "AICTE",
    "category": "Hardware",
    "theme": "Smart Resource Conservation",
    "domain": "Smart Resource Conservation",
    "tags": [
      "EdTech",
      "Hardware"
    ]
  },
  {
    "id": "SIH26211",
    "title": "Student Innovation",
    "organization": "AICTE",
    "category": "Hardware",
    "theme": "Fitness & Sports",
    "domain": "Fitness & Sports",
    "tags": [
      "EdTech",
      "Hardware"
    ]
  },
  {
    "id": "SIH26212",
    "title": "Student Innovation",
    "organization": "AICTE",
    "category": "Hardware",
    "theme": "Heritage & Culture",
    "domain": "Heritage & Culture",
    "tags": [
      "EdTech",
      "Hardware"
    ]
  },
  {
    "id": "SIH26213",
    "title": "Student Innovation",
    "organization": "AICTE",
    "category": "Hardware",
    "theme": "MedTech / BioTech / HealthTech",
    "domain": "MedTech / BioTech / HealthTech",
    "tags": [
      "IoT",
      "Healthcare",
      "EdTech",
      "Hardware"
    ]
  },
  {
    "id": "SIH26214",
    "title": "Student Innovation",
    "organization": "AICTE",
    "category": "Hardware",
    "theme": "Agriculture, FoodTech & Rural Development",
    "domain": "Agriculture, FoodTech & Rural Development",
    "tags": [
      "EdTech",
      "Hardware"
    ]
  },
  {
    "id": "SIH26215",
    "title": "Student Innovation",
    "organization": "AICTE",
    "category": "Hardware",
    "theme": "Transportation & Logistics",
    "domain": "Transportation & Logistics",
    "tags": [
      "EdTech",
      "Geo-Location",
      "Hardware"
    ]
  },
  {
    "id": "SIH26216",
    "title": "Student Innovation",
    "organization": "AICTE",
    "category": "Hardware",
    "theme": "Fitness & Sports",
    "domain": "Fitness & Sports",
    "tags": [
      "EdTech",
      "Hardware"
    ]
  },
  {
    "id": "SIH26217",
    "title": "Student Innovation",
    "organization": "AICTE",
    "category": "Hardware",
    "theme": "MedTech / BioTech / HealthTech",
    "domain": "MedTech / BioTech / HealthTech",
    "tags": [
      "IoT",
      "Healthcare",
      "EdTech",
      "Hardware"
    ]
  },
  {
    "id": "SIH26218",
    "title": "Student Innovation",
    "organization": "AICTE",
    "category": "Hardware",
    "theme": "Smart Resource Conservation",
    "domain": "Smart Resource Conservation",
    "tags": [
      "EdTech",
      "Hardware"
    ]
  },
  {
    "id": "SIH26219",
    "title": "Student Innovation",
    "organization": "AICTE",
    "category": "Hardware",
    "theme": "Travel & Tourism",
    "domain": "Travel & Tourism",
    "tags": [
      "EdTech",
      "Hardware"
    ]
  },
  {
    "id": "SIH26220",
    "title": "Student Innovation",
    "organization": "AICTE",
    "category": "Hardware",
    "theme": "Renewable / Sustainable Energy",
    "domain": "Renewable / Sustainable Energy",
    "tags": [
      "EdTech",
      "Hardware"
    ]
  },
  {
    "id": "SIH26221",
    "title": "Student Innovation",
    "organization": "AICTE",
    "category": "Hardware",
    "theme": "Miscellaneous",
    "domain": "Miscellaneous",
    "tags": [
      "EdTech",
      "Hardware"
    ]
  },
  {
    "id": "SIH26222",
    "title": "Student Innovation",
    "organization": "AICTE",
    "category": "Hardware",
    "theme": "Smart Education",
    "domain": "Smart Education",
    "tags": [
      "EdTech",
      "Hardware"
    ]
  },
  {
    "id": "SIH26223",
    "title": "Student Innovation",
    "organization": "AICTE",
    "category": "Hardware",
    "theme": "Disaster Management",
    "domain": "Disaster Management",
    "tags": [
      "EdTech",
      "Hardware"
    ]
  },
  {
    "id": "SIH26224",
    "title": "Student Innovation",
    "organization": "AICTE",
    "category": "Hardware",
    "theme": "Travel & Tourism",
    "domain": "Travel & Tourism",
    "tags": [
      "EdTech",
      "Hardware"
    ]
  },
  {
    "id": "SIH26225",
    "title": "Student Innovation",
    "organization": "AICTE",
    "category": "Hardware",
    "theme": "Heritage & Culture",
    "domain": "Heritage & Culture",
    "tags": [
      "EdTech",
      "Hardware"
    ]
  },
  {
    "id": "SIH26226",
    "title": "Student Innovation",
    "organization": "AICTE",
    "category": "Hardware",
    "theme": "Space Technology",
    "domain": "Space Technology",
    "tags": [
      "EdTech",
      "Hardware"
    ]
  }
];

export const DOMAINS = Array.from(new Set(PROBLEM_STATEMENTS.map((p) => p.domain))).sort();
export const ORGANIZATIONS = Array.from(new Set(PROBLEM_STATEMENTS.map((p) => p.organization))).sort();
export const CATEGORIES = ["Software", "Hardware"] as const;
export const TECHNOLOGIES = Array.from(new Set(PROBLEM_STATEMENTS.flatMap((p) => p.tags))).sort();
