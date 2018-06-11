
var leafletUtil = {};

var categories = {"categories":[
    {"0":{"clazz":"macrocategory","value":"Accommodation","name":"Accommodation","img":"Accommodation.png"}},
    {"1":{"clazz":"sub_Accommodation subcategory","value":"Agritourism","name":"Agritourism","img":"Accommodation_Agritourism.png"}},
    {"2":{"clazz":"sub_Accommodation subcategory","value":"Beach_resort","name":"Beach_resort","img":"Accommodation_Beach_resort.png"}},
    {"3":{"clazz":"sub_Accommodation subcategory","value":"Bed_and_breakfast","name":"Bed_and_breakfast","img":"Accommodation_Bed_and_breakfast.png"}},
    {"4":{"clazz":"sub_Accommodation subcategory","value":"Boarding_house","name":"Boarding_house","img":"Accommodation_Boarding_house.png"}},
    {"5":{"clazz":"sub_Accommodation subcategory","value":"Camping","name":"Camping","img":"Accommodation_Camping.png"}},
    {"6":{"clazz":"sub_Accommodation subcategory","value":"Day_care_centre","name":"Day_care_centre","img":"Accommodation_Day_care_centre.png"}},
    {"7":{"clazz":"sub_Accommodation subcategory","value":"Farm_house","name":"Farm_house","img":"Accommodation_Farm_house.png"}},
    {"8":{"clazz":"sub_Accommodation subcategory","value":"Historic_residence","name":"Historic_residence","img":"Accommodation_Historic_residence.png"}},
    {"9":{"clazz":"sub_Accommodation subcategory","value":"Holiday_village","name":"Holiday_village","img":"Accommodation_Holiday_village.png"}},
    {"10":{"clazz":"sub_Accommodation subcategory","value":"Hostel","name":"Hostel","img":"Accommodation_Hostel.png"}},
    {"11":{"clazz":"sub_Accommodation subcategory","value":"Hotel","name":"Hotel","img":"Accommodation_Hotel.png"}},
    {"12":{"clazz":"sub_Accommodation subcategory","value":"Mountain_shelter","name":"Mountain_shelter","img":"Accommodation_Mountain_shelter.png"}},
    {"13":{"clazz":"sub_Accommodation subcategory","value":"Other_accommodation","name":"Other_accommodation","img":"Accommodation_Other_accommodation.png"}},
    {"14":{"clazz":"sub_Accommodation subcategory","value":"Religiuos_guest_house","name":"Religiuos_guest_house","img":"Accommodation_Religiuos_guest_house.png"}},
    {"15":{"clazz":"sub_Accommodation subcategory","value":"Rest_home","name":"Rest_home","img":"Accommodation_Rest_home.png"}},
    {"16":{"clazz":"sub_Accommodation subcategory","value":"Summer_camp","name":"Summer_camp","img":"Accommodation_Summer_camp.png"}},
    {"17":{"clazz":"sub_Accommodation subcategory","value":"Summer_residence","name":"Summer_residence","img":"Accommodation_Summer_residence.png"}},
    {"18":{"clazz":"sub_Accommodation subcategory","value":"Vacation_resort","name":"Vacation_resort","img":"Accommodation_Vacation_resort.png"}},
    {"19":{"clazz":"macrocategory","value":"Advertising","name":"Advertising","img":"Advertising.png"}},
    {"20":{"clazz":"sub_Advertising subcategory","value":"Advertising_and_promotion","name":"Advertising_and_promotion","img":"Advertising_Advertising_and_promotion.png"}},
    {"21":{"clazz":"sub_Advertising subcategory","value":"Market_polling","name":"Market_polling","img":"Advertising_Market_polling.png"}},
    {"22":{"clazz":"macrocategory","value":"AgricultureAndLivestock","name":"AgricultureAndLivestock","img":"AgricultureAndLivestock.png"}},
    {"23":{"clazz":"sub_AgricultureAndLivestock subcategory","value":"Animal_production","name":"Animal_production","img":"AgricultureAndLivestock_Animal_production.png"}},
    {"24":{"clazz":"sub_AgricultureAndLivestock subcategory","value":"Crop_animal_production_hunting","name":"Crop_animal_production_hunting","img":"AgricultureAndLivestock_Crop_animal_production_hunting.png"}},
    {"25":{"clazz":"sub_AgricultureAndLivestock subcategory","value":"Crop_production","name":"Crop_production","img":"AgricultureAndLivestock_Crop_production.png"}},
    {"26":{"clazz":"sub_AgricultureAndLivestock subcategory","value":"Fishing_and_aquaculture","name":"Fishing_and_aquaculture","img":"AgricultureAndLivestock_Fishing_and_aquaculture.png"}},
    {"27":{"clazz":"sub_AgricultureAndLivestock subcategory","value":"Hunting_trapping_and_services","name":"Hunting_trapping_and_services","img":"AgricultureAndLivestock_Hunting_trapping_and_services.png"}},
    {"28":{"clazz":"sub_AgricultureAndLivestock subcategory","value":"Support_animal_production","name":"Support_animal_production","img":"AgricultureAndLivestock_Support_animal_production.png"}},
    {"29":{"clazz":"sub_AgricultureAndLivestock subcategory","value":"Veterinary","name":"Veterinary","img":"AgricultureAndLivestock_Veterinary.png"}},
    {"30":{"clazz":"macrocategory","value":"CivilAndEdilEngineering","name":"CivilAndEdilEngineering","img":"CivilAndEdilEngineering.png"}},
    {"31":{"clazz":"sub_CivilAndEdilEngineering subcategory","value":"Architectural_consulting","name":"Architectural_consulting","img":"CivilAndEdilEngineering_Architectural_consulting.png"}},
    {"32":{"clazz":"sub_CivilAndEdilEngineering subcategory","value":"Building_construction","name":"Building_construction","img":"CivilAndEdilEngineering_Building_construction.png"}},
    {"33":{"clazz":"sub_CivilAndEdilEngineering subcategory","value":"Cartographers","name":"Cartographers","img":"CivilAndEdilEngineering_Cartographers.png"}},
    {"34":{"clazz":"sub_CivilAndEdilEngineering subcategory","value":"Civil_engineering","name":"Civil_engineering","img":"CivilAndEdilEngineering_Civil_engineering.png"}},
    {"35":{"clazz":"sub_CivilAndEdilEngineering subcategory","value":"Engineering_consulting","name":"Engineering_consulting","img":"CivilAndEdilEngineering_Engineering_consulting.png"}},
    {"36":{"clazz":"sub_CivilAndEdilEngineering subcategory","value":"Other_specialized_construction","name":"Other_specialized_construction","img":"CivilAndEdilEngineering_Other_specialized_construction.png"}},
    {"37":{"clazz":"sub_CivilAndEdilEngineering subcategory","value":"Specialized_construction","name":"Specialized_construction","img":"CivilAndEdilEngineering_Specialized_construction.png"}},
    {"38":{"clazz":"sub_CivilAndEdilEngineering subcategory","value":"Surveyor","name":"Surveyor","img":"CivilAndEdilEngineering_Surveyor.png"}},
    {"39":{"clazz":"sub_CivilAndEdilEngineering subcategory","value":"Technical_consultants","name":"Technical_consultants","img":"CivilAndEdilEngineering_Technical_consultants.png"}},
    {"40":{"clazz":"macrocategory","value":"CulturalActivity","name":"CulturalActivity","img":"CulturalActivity.png"}},
    {"41":{"clazz":"sub_CulturalActivity subcategory","value":"Archaeological_site","name":"Archaeological_site","img":"CulturalActivity_Archaeological_site.png"}},
    {"42":{"clazz":"sub_CulturalActivity subcategory","value":"Auditorium","name":"Auditorium","img":"CulturalActivity_Auditorium.png"}},
    {"43":{"clazz":"sub_CulturalActivity subcategory","value":"Botanical_and_zoological_gardens","name":"Botanical_and_zoological_gardens","img":"CulturalActivity_Botanical_and_zoological_gardens.png"}},
    {"44":{"clazz":"sub_CulturalActivity subcategory","value":"Churches","name":"Churches","img":"CulturalActivity_Churches.png"}},
    {"45":{"clazz":"sub_CulturalActivity subcategory","value":"Cultural_centre","name":"Cultural_centre","img":"CulturalActivity_Cultural_centre.png"}},
    {"46":{"clazz":"sub_CulturalActivity subcategory","value":"Cultural_sites","name":"Cultural_sites","img":"CulturalActivity_Cultural_sites.png"}},
    {"47":{"clazz":"sub_CulturalActivity subcategory","value":"Historical_buildings","name":"Historical_buildings","img":"CulturalActivity_Historical_buildings.png"}},
    {"48":{"clazz":"sub_CulturalActivity subcategory","value":"Journalist","name":"Journalist","img":"CulturalActivity_Journalist.png"}},
    {"49":{"clazz":"sub_CulturalActivity subcategory","value":"Leasing_of_intellectual_property","name":"Leasing_of_intellectual_property","img":"CulturalActivity_Leasing_of_intellectual_property.png"}},
    {"50":{"clazz":"sub_CulturalActivity subcategory","value":"Library","name":"Library","img":"CulturalActivity_Library.png"}},
    {"51":{"clazz":"sub_CulturalActivity subcategory","value":"Monument_location","name":"Monument_location","img":"CulturalActivity_Monument_location.png"}},
    {"52":{"clazz":"sub_CulturalActivity subcategory","value":"Motion_picture_and_television_programme_activities","name":"Motion_picture_and_television_programme_activities","img":"CulturalActivity_Motion_picture_and_television_programme_activities.png"}},
    {"53":{"clazz":"sub_CulturalActivity subcategory","value":"Museum","name":"Museum","img":"CulturalActivity_Museum.png"}},
    {"54":{"clazz":"sub_CulturalActivity subcategory","value":"News_agency","name":"News_agency","img":"CulturalActivity_News_agency.png"}},
    {"55":{"clazz":"sub_CulturalActivity subcategory","value":"Other_broadcasting","name":"Other_broadcasting","img":"CulturalActivity_Other_broadcasting.png"}},
    {"56":{"clazz":"sub_CulturalActivity subcategory","value":"Photographic_activities","name":"Photographic_activities","img":"CulturalActivity_Photographic_activities.png"}},
    {"57":{"clazz":"sub_CulturalActivity subcategory","value":"Printing_and_recorded_media","name":"Printing_and_recorded_media","img":"CulturalActivity_Printing_and_recorded_media.png"}},
    {"58":{"clazz":"sub_CulturalActivity subcategory","value":"Printing_and_services","name":"Printing_and_services","img":"CulturalActivity_Printing_and_services.png"}},
    {"59":{"clazz":"sub_CulturalActivity subcategory","value":"Publishing_activities","name":"Publishing_activities","img":"CulturalActivity_Publishing_activities.png"}},
    {"60":{"clazz":"sub_CulturalActivity subcategory","value":"Radio_broadcasting","name":"Radio_broadcasting","img":"CulturalActivity_Radio_broadcasting.png"}},
    {"61":{"clazz":"sub_CulturalActivity subcategory","value":"Reproduction_recorded_media","name":"Reproduction_recorded_media","img":"CulturalActivity_Reproduction_recorded_media.png"}},
    {"62":{"clazz":"sub_CulturalActivity subcategory","value":"Sound_recording_and_music_publishing","name":"Sound_recording_and_music_publishing","img":"CulturalActivity_Sound_recording_and_music_publishing.png"}},
    {"63":{"clazz":"sub_CulturalActivity subcategory","value":"Squares","name":"Squares","img":"CulturalActivity_Squares.png"}},
    {"64":{"clazz":"sub_CulturalActivity subcategory","value":"Television_broadcasting","name":"Television_broadcasting","img":"CulturalActivity_Television_broadcasting.png"}},
    {"65":{"clazz":"sub_CulturalActivity subcategory","value":"Theatre","name":"Theatre","img":"CulturalActivity_Theatre.png"}},
    {"66":{"clazz":"sub_CulturalActivity subcategory","value":"Translation_and_interpreting","name":"Translation_and_interpreting","img":"CulturalActivity_Translation_and_interpreting.png"}},
    {"67":{"clazz":"macrocategory","value":"EducationAndResearch","name":"EducationAndResearch","img":"EducationAndResearch.png"}},
    {"68":{"clazz":"sub_EducationAndResearch subcategory","value":"Automobile_driving_and_flying_schools","name":"Automobile_driving_and_flying_schools","img":"EducationAndResearch_Automobile_driving_and_flying_schools.png"}},
    {"69":{"clazz":"sub_EducationAndResearch subcategory","value":"Conservatory","name":"Conservatory","img":"EducationAndResearch_Conservatory.png"}},
    {"70":{"clazz":"sub_EducationAndResearch subcategory","value":"Cultural_education","name":"Cultural_education","img":"EducationAndResearch_Cultural_education.png"}},
    {"71":{"clazz":"sub_EducationAndResearch subcategory","value":"Dance_schools","name":"Dance_schools","img":"EducationAndResearch_Dance_schools.png"}},
    {"72":{"clazz":"sub_EducationAndResearch subcategory","value":"Diving_school","name":"Diving_school","img":"EducationAndResearch_Diving_school.png"}},
    {"73":{"clazz":"sub_EducationAndResearch subcategory","value":"Educational_support_activities","name":"Educational_support_activities","img":"EducationAndResearch_Educational_support_activities.png"}},
    {"74":{"clazz":"sub_EducationAndResearch subcategory","value":"Higher_education","name":"Higher_education","img":"EducationAndResearch_Higher_education.png"}},
    {"75":{"clazz":"sub_EducationAndResearch subcategory","value":"Language_courses","name":"Language_courses","img":"EducationAndResearch_Language_courses.png"}},
    {"76":{"clazz":"sub_EducationAndResearch subcategory","value":"Performing_arts_schools","name":"Performing_arts_schools","img":"EducationAndResearch_Performing_arts_schools.png"}},
    {"77":{"clazz":"sub_EducationAndResearch subcategory","value":"Post_secondary_education","name":"Post_secondary_education","img":"EducationAndResearch_Post_secondary_education.png"}},
    {"78":{"clazz":"sub_EducationAndResearch subcategory","value":"Pre_primary_education","name":"Pre_primary_education","img":"EducationAndResearch_Pre_primary_education.png"}},
    {"79":{"clazz":"sub_EducationAndResearch subcategory","value":"Primary_education","name":"Primary_education","img":"EducationAndResearch_Primary_education.png"}},
    {"80":{"clazz":"sub_EducationAndResearch subcategory","value":"Private_high_school","name":"Private_high_school","img":"EducationAndResearch_Private_high_school.png"}},
    {"81":{"clazz":"sub_EducationAndResearch subcategory","value":"Private_infant_school","name":"Private_infant_school","img":"EducationAndResearch_Private_infant_school.png"}},
    {"82":{"clazz":"sub_EducationAndResearch subcategory","value":"Private_junior_high_school","name":"Private_junior_high_school","img":"EducationAndResearch_Private_junior_high_school.png"}},
    {"83":{"clazz":"sub_EducationAndResearch subcategory","value":"Private_junior_school","name":"Private_junior_school","img":"EducationAndResearch_Private_junior_school.png"}},
    {"84":{"clazz":"sub_EducationAndResearch subcategory","value":"Private_polytechnic_school","name":"Private_polytechnic_school","img":"EducationAndResearch_Private_polytechnic_school.png"}},
    {"85":{"clazz":"sub_EducationAndResearch subcategory","value":"Private_preschool","name":"Private_preschool","img":"EducationAndResearch_Private_preschool.png"}},
    {"86":{"clazz":"sub_EducationAndResearch subcategory","value":"Private_professional_institute","name":"Private_professional_institute","img":"EducationAndResearch_Private_professional_institute.png"}},
    {"87":{"clazz":"sub_EducationAndResearch subcategory","value":"Public_high_school","name":"Public_high_school","img":"EducationAndResearch_Public_high_school.png"}},
    {"88":{"clazz":"sub_EducationAndResearch subcategory","value":"Public_infant_school","name":"Public_infant_school","img":"EducationAndResearch_Public_infant_school.png"}},
    {"89":{"clazz":"sub_EducationAndResearch subcategory","value":"Public_junior_high_school","name":"Public_junior_high_school","img":"EducationAndResearch_Public_junior_high_school.png"}},
    {"90":{"clazz":"sub_EducationAndResearch subcategory","value":"Public_junior_school","name":"Public_junior_school","img":"EducationAndResearch_Public_junior_school.png"}},
    {"91":{"clazz":"sub_EducationAndResearch subcategory","value":"Public_polytechnic_school","name":"Public_polytechnic_school","img":"EducationAndResearch_Public_polytechnic_school.png"}},
    {"92":{"clazz":"sub_EducationAndResearch subcategory","value":"Public_professional_institute","name":"Public_professional_institute","img":"EducationAndResearch_Public_professional_institute.png"}},
    {"93":{"clazz":"sub_EducationAndResearch subcategory","value":"Public_university","name":"Public_university","img":"EducationAndResearch_Public_university.png"}},
    {"94":{"clazz":"sub_EducationAndResearch subcategory","value":"Research_and_development","name":"Research_and_development","img":"EducationAndResearch_Research_and_development.png"}},
    {"95":{"clazz":"sub_EducationAndResearch subcategory","value":"Sailing_school","name":"Sailing_school","img":"EducationAndResearch_Sailing_school.png"}},
    {"96":{"clazz":"sub_EducationAndResearch subcategory","value":"Secondary_education","name":"Secondary_education","img":"EducationAndResearch_Secondary_education.png"}},
    {"97":{"clazz":"sub_EducationAndResearch subcategory","value":"Ski_school","name":"Ski_school","img":"EducationAndResearch_Ski_school.png"}},
    {"98":{"clazz":"sub_EducationAndResearch subcategory","value":"Sports_and_recreation_education","name":"Sports_and_recreation_education","img":"EducationAndResearch_Sports_and_recreation_education.png"}},
    {"99":{"clazz":"sub_EducationAndResearch subcategory","value":"Training_school","name":"Training_school","img":"EducationAndResearch_Training_school.png"}},
    {"100":{"clazz":"sub_EducationAndResearch subcategory","value":"Training_school_for_teachers","name":"Training_school_for_teachers","img":"EducationAndResearch_Training_school_for_teachers.png"}},
    {"101":{"clazz":"macrocategory","value":"Emergency","name":"Emergency","img":"Emergency.png"}},
    {"102":{"clazz":"sub_Emergency subcategory","value":"Carabinieri","name":"Carabinieri","img":"Emergency_Carabinieri.png"}},
    {"103":{"clazz":"sub_Emergency subcategory","value":"Civil_protection","name":"Civil_protection","img":"Emergency_Civil_protection.png"}},
    {"104":{"clazz":"sub_Emergency subcategory","value":"Coast_guard_harbormaster","name":"Coast_guard_harbormaster","img":"Emergency_Coast_guard_harbormaster.png"}},
    {"105":{"clazz":"sub_Emergency subcategory","value":"Commissariat_of_public_safety","name":"Commissariat_of_public_safety","img":"Emergency_Commissariat_of_public_safety.png"}},
    {"106":{"clazz":"sub_Emergency subcategory","value":"Corps_of_forest_rangers","name":"Corps_of_forest_rangers","img":"Emergency_Corps_of_forest_rangers.png"}},
    {"107":{"clazz":"sub_Emergency subcategory","value":"Emergency_medical_care","name":"Emergency_medical_care","img":"Emergency_Emergency_medical_care.png"}},
    {"108":{"clazz":"sub_Emergency subcategory","value":"Emergency_services","name":"Emergency_services","img":"Emergency_Emergency_services.png"}},
    {"109":{"clazz":"sub_Emergency subcategory","value":"Fire_brigade","name":"Fire_brigade","img":"Emergency_Fire_brigade.png"}},
    {"110":{"clazz":"sub_Emergency subcategory","value":"First_aid","name":"First_aid","img":"Emergency_First_aid.png"}},
    {"111":{"clazz":"sub_Emergency subcategory","value":"Italian_finance_police","name":"Italian_finance_police","img":"Emergency_Italian_finance_police.png"}},
    {"112":{"clazz":"sub_Emergency subcategory","value":"Local_police","name":"Local_police","img":"Emergency_Local_police.png"}},
    {"113":{"clazz":"sub_Emergency subcategory","value":"Towing_and_roadside_assistance","name":"Towing_and_roadside_assistance","img":"Emergency_Towing_and_roadside_assistance.png"}},
    {"114":{"clazz":"sub_Emergency subcategory","value":"Traffic_corps","name":"Traffic_corps","img":"Emergency_Traffic_corps.png"}},
    {"115":{"clazz":"sub_Emergency subcategory","value":"Useful_numbers","name":"Useful_numbers","img":"Emergency_Useful_numbers.png"}},
    {"116":{"clazz":"macrocategory","value":"Entertainment","name":"Entertainment","img":"Entertainment.png"}},
    {"117":{"clazz":"sub_Entertainment subcategory","value":"Amusement_activities","name":"Amusement_activities","img":"Entertainment_Amusement_activities.png"}},
    {"118":{"clazz":"sub_Entertainment subcategory","value":"Amusement_and_theme_parks","name":"Amusement_and_theme_parks","img":"Entertainment_Amusement_and_theme_parks.png"}},
    {"119":{"clazz":"sub_Entertainment subcategory","value":"Aquarium","name":"Aquarium","img":"Entertainment_Aquarium.png"}},
    {"120":{"clazz":"sub_Entertainment subcategory","value":"Betting_shops","name":"Betting_shops","img":"Entertainment_Betting_shops.png"}},
    {"121":{"clazz":"sub_Entertainment subcategory","value":"Boxoffice","name":"Boxoffice","img":"Entertainment_Boxoffice.png"}},
    {"122":{"clazz":"sub_Entertainment subcategory","value":"Cinema","name":"Cinema","img":"Entertainment_Cinema.png"}},
    {"123":{"clazz":"sub_Entertainment subcategory","value":"Climbing","name":"Climbing","img":"Entertainment_Climbing.png"}},
    {"124":{"clazz":"sub_Entertainment subcategory","value":"Discotheque","name":"Discotheque","img":"Entertainment_Discotheque.png"}},
    {"125":{"clazz":"sub_Entertainment subcategory","value":"Fishing_reserve","name":"Fishing_reserve","img":"Entertainment_Fishing_reserve.png"}},
    {"126":{"clazz":"sub_Entertainment subcategory","value":"Gambling_and_betting","name":"Gambling_and_betting","img":"Entertainment_Gambling_and_betting.png"}},
    {"127":{"clazz":"sub_Entertainment subcategory","value":"Game_reserve","name":"Game_reserve","img":"Entertainment_Game_reserve.png"}},
    {"128":{"clazz":"sub_Entertainment subcategory","value":"Game_room","name":"Game_room","img":"Entertainment_Game_room.png"}},
    {"129":{"clazz":"sub_Entertainment subcategory","value":"Gardens","name":"Gardens","img":"Entertainment_Gardens.png"}},
    {"130":{"clazz":"sub_Entertainment subcategory","value":"Golf","name":"Golf","img":"Entertainment_Golf.png"}},
    {"131":{"clazz":"sub_Entertainment subcategory","value":"Green_areas","name":"Green_areas","img":"Entertainment_Green_areas.png"}},
    {"132":{"clazz":"sub_Entertainment subcategory","value":"Gym_fitness","name":"Gym_fitness","img":"Entertainment_Gym_fitness.png"}},
    {"133":{"clazz":"sub_Entertainment subcategory","value":"Hippodrome","name":"Hippodrome","img":"Entertainment_Hippodrome.png"}},
    {"134":{"clazz":"sub_Entertainment subcategory","value":"Operation_of_casinos","name":"Operation_of_casinos","img":"Entertainment_Operation_of_casinos.png"}},
    {"135":{"clazz":"sub_Entertainment subcategory","value":"Pool","name":"Pool","img":"Entertainment_Pool.png"}},
    {"136":{"clazz":"sub_Entertainment subcategory","value":"Rafting_kayak","name":"Rafting_kayak","img":"Entertainment_Rafting_kayak.png"}},
    {"137":{"clazz":"sub_Entertainment subcategory","value":"Recreation_room","name":"Recreation_room","img":"Entertainment_Recreation_room.png"}},
    {"138":{"clazz":"sub_Entertainment subcategory","value":"Riding_stables","name":"Riding_stables","img":"Entertainment_Riding_stables.png"}},
    {"139":{"clazz":"sub_Entertainment subcategory","value":"Skiing_facility","name":"Skiing_facility","img":"Entertainment_Skiing_facility.png"}},
    {"140":{"clazz":"sub_Entertainment subcategory","value":"Social_centre","name":"Social_centre","img":"Entertainment_Social_centre.png"}},
    {"141":{"clazz":"sub_Entertainment subcategory","value":"Sports_clubs","name":"Sports_clubs","img":"Entertainment_Sports_clubs.png"}},
    {"142":{"clazz":"sub_Entertainment subcategory","value":"Sports_facility","name":"Sports_facility","img":"Entertainment_Sports_facility.png"}},
    {"143":{"clazz":"sub_Entertainment subcategory","value":"Sport_event_promoters","name":"Sport_event_promoters","img":"Entertainment_Sport_event_promoters.png"}},
    {"144":{"clazz":"macrocategory","value":"Environment","name":"Environment","img":"Environment.png"}},
    {"145":{"clazz":"sub_Environment subcategory","value":"Building_and_industrial_cleaning_activities","name":"Building_and_industrial_cleaning_activities","img":"Environment_Building_and_industrial_cleaning_activities.png"}},
    {"146":{"clazz":"sub_Environment subcategory","value":"Cleaning_activities","name":"Cleaning_activities","img":"Environment_Cleaning_activities.png"}},
    {"147":{"clazz":"sub_Environment subcategory","value":"Disinfecting_and_exterminating_activities","name":"Disinfecting_and_exterminating_activities","img":"Environment_Disinfecting_and_exterminating_activities.png"}},
    {"148":{"clazz":"sub_Environment subcategory","value":"Forestry","name":"Forestry","img":"Environment_Forestry.png"}},
    {"149":{"clazz":"sub_Environment subcategory","value":"Geologists","name":"Geologists","img":"Environment_Geologists.png"}},
    {"150":{"clazz":"sub_Environment subcategory","value":"Landscape_care","name":"Landscape_care","img":"Environment_Landscape_care.png"}},
    {"151":{"clazz":"sub_Environment subcategory","value":"Materials_recovery","name":"Materials_recovery","img":"Environment_Materials_recovery.png"}},
    {"152":{"clazz":"sub_Environment subcategory","value":"Photovoltaic_system","name":"Photovoltaic_system","img":"Environment_Photovoltaic_system.png"}},
    {"153":{"clazz":"sub_Environment subcategory","value":"Sewerage","name":"Sewerage","img":"Environment_Sewerage.png"}},
    {"154":{"clazz":"sub_Environment subcategory","value":"Street_sweeping","name":"Street_sweeping","img":"Environment_Street_sweeping.png"}},
    {"155":{"clazz":"sub_Environment subcategory","value":"Waste_collection_and_treatment","name":"Waste_collection_and_treatment","img":"Environment_Waste_collection_and_treatment.png"}},
    {"156":{"clazz":"sub_Environment subcategory","value":"Weather_sensor","name":"Weather_sensor","img":"Environment_Weather_sensor.png"}},
    {"157":{"clazz":"macrocategory","value":"FinancialService","name":"FinancialService","img":"FinancialService.png"}},
    {"158":{"clazz":"sub_FinancialService subcategory","value":"Accountants","name":"Accountants","img":"FinancialService_Accountants.png"}},
    {"159":{"clazz":"sub_FinancialService subcategory","value":"Auditing_activities","name":"Auditing_activities","img":"FinancialService_Auditing_activities.png"}},
    {"160":{"clazz":"sub_FinancialService subcategory","value":"Bank","name":"Bank","img":"FinancialService_Bank.png"}},
    {"161":{"clazz":"sub_FinancialService subcategory","value":"Financial_institute","name":"Financial_institute","img":"FinancialService_Financial_institute.png"}},
    {"162":{"clazz":"sub_FinancialService subcategory","value":"Insurance","name":"Insurance","img":"FinancialService_Insurance.png"}},
    {"163":{"clazz":"sub_FinancialService subcategory","value":"Insurance_and_financial","name":"Insurance_and_financial","img":"FinancialService_Insurance_and_financial.png"}},
    {"164":{"clazz":"sub_FinancialService subcategory","value":"Labour_consultant","name":"Labour_consultant","img":"FinancialService_Labour_consultant.png"}},
    {"165":{"clazz":"sub_FinancialService subcategory","value":"Legal_office","name":"Legal_office","img":"FinancialService_Legal_office.png"}},
    {"166":{"clazz":"sub_FinancialService subcategory","value":"Tax_advice","name":"Tax_advice","img":"FinancialService_Tax_advice.png"}},
    {"167":{"clazz":"macrocategory","value":"GovernmentOffice","name":"GovernmentOffice","img":"GovernmentOffice.png"}},
    {"168":{"clazz":"sub_GovernmentOffice subcategory","value":"Airport_lost_property_office","name":"Airport_lost_property_office","img":"GovernmentOffice_Airport_lost_property_office.png"}},
    {"169":{"clazz":"sub_GovernmentOffice subcategory","value":"Civil_registry","name":"Civil_registry","img":"GovernmentOffice_Civil_registry.png"}},
    {"170":{"clazz":"sub_GovernmentOffice subcategory","value":"Consulate","name":"Consulate","img":"GovernmentOffice_Consulate.png"}},
    {"171":{"clazz":"sub_GovernmentOffice subcategory","value":"Department_of_motor_vehicles","name":"Department_of_motor_vehicles","img":"GovernmentOffice_Department_of_motor_vehicles.png"}},
    {"172":{"clazz":"sub_GovernmentOffice subcategory","value":"District","name":"District","img":"GovernmentOffice_District.png"}},
    {"173":{"clazz":"sub_GovernmentOffice subcategory","value":"Employment_exchange","name":"Employment_exchange","img":"GovernmentOffice_Employment_exchange.png"}},
    {"174":{"clazz":"sub_GovernmentOffice subcategory","value":"Income_revenue_authority","name":"Income_revenue_authority","img":"GovernmentOffice_Income_revenue_authority.png"}},
    {"175":{"clazz":"sub_GovernmentOffice subcategory","value":"Other_office","name":"Other_office","img":"GovernmentOffice_Other_office.png"}},
    {"176":{"clazz":"sub_GovernmentOffice subcategory","value":"Police_headquarters","name":"Police_headquarters","img":"GovernmentOffice_Police_headquarters.png"}},
    {"177":{"clazz":"sub_GovernmentOffice subcategory","value":"Postal_office","name":"Postal_office","img":"GovernmentOffice_Postal_office.png"}},
    {"178":{"clazz":"sub_GovernmentOffice subcategory","value":"Prefecture","name":"Prefecture","img":"GovernmentOffice_Prefecture.png"}},
    {"179":{"clazz":"sub_GovernmentOffice subcategory","value":"Social_security_service_office","name":"Social_security_service_office","img":"GovernmentOffice_Social_security_service_office.png"}},
    {"180":{"clazz":"sub_GovernmentOffice subcategory","value":"Train_lost_property_office","name":"Train_lost_property_office","img":"GovernmentOffice_Train_lost_property_office.png"}},
    {"181":{"clazz":"sub_GovernmentOffice subcategory","value":"Welfare_worker_office","name":"Welfare_worker_office","img":"GovernmentOffice_Welfare_worker_office.png"}},
    {"182":{"clazz":"sub_GovernmentOffice subcategory","value":"Youth_information_centre","name":"Youth_information_centre","img":"GovernmentOffice_Youth_information_centre.png"}},
    {"183":{"clazz":"macrocategory","value":"HealthCare","name":"HealthCare","img":"HealthCare.png"}},
    {"184":{"clazz":"sub_HealthCare subcategory","value":"Addiction_recovery_centre","name":"Addiction_recovery_centre","img":"HealthCare_Addiction_recovery_centre.png"}},
    {"185":{"clazz":"sub_HealthCare subcategory","value":"Community_centre","name":"Community_centre","img":"HealthCare_Community_centre.png"}},
    {"186":{"clazz":"sub_HealthCare subcategory","value":"Dentist","name":"Dentist","img":"HealthCare_Dentist.png"}},
    {"187":{"clazz":"sub_HealthCare subcategory","value":"Doctor_office","name":"Doctor_office","img":"HealthCare_Doctor_office.png"}},
    {"188":{"clazz":"sub_HealthCare subcategory","value":"Family_counselling","name":"Family_counselling","img":"HealthCare_Family_counselling.png"}},
    {"189":{"clazz":"sub_HealthCare subcategory","value":"Group_practice","name":"Group_practice","img":"HealthCare_Group_practice.png"}},
    {"190":{"clazz":"sub_HealthCare subcategory","value":"Haircare_centres","name":"Haircare_centres","img":"HealthCare_Haircare_centres.png"}},
    {"191":{"clazz":"sub_HealthCare subcategory","value":"Healthcare_centre","name":"Healthcare_centre","img":"HealthCare_Healthcare_centre.png"}},
    {"192":{"clazz":"sub_HealthCare subcategory","value":"Health_district","name":"Health_district","img":"HealthCare_Health_district.png"}},
    {"193":{"clazz":"sub_HealthCare subcategory","value":"Health_reservations_centre","name":"Health_reservations_centre","img":"HealthCare_Health_reservations_centre.png"}},
    {"194":{"clazz":"sub_HealthCare subcategory","value":"Human_health_activities","name":"Human_health_activities","img":"HealthCare_Human_health_activities.png"}},
    {"195":{"clazz":"sub_HealthCare subcategory","value":"Local_health_authority","name":"Local_health_authority","img":"HealthCare_Local_health_authority.png"}},
    {"196":{"clazz":"sub_HealthCare subcategory","value":"Medical_analysis_laboratories","name":"Medical_analysis_laboratories","img":"HealthCare_Medical_analysis_laboratories.png"}},
    {"197":{"clazz":"sub_HealthCare subcategory","value":"Mental_health_centre","name":"Mental_health_centre","img":"HealthCare_Mental_health_centre.png"}},
    {"198":{"clazz":"sub_HealthCare subcategory","value":"Paramedical_activities","name":"Paramedical_activities","img":"HealthCare_Paramedical_activities.png"}},
    {"199":{"clazz":"sub_HealthCare subcategory","value":"Physical_therapy_centre","name":"Physical_therapy_centre","img":"HealthCare_Physical_therapy_centre.png"}},
    {"200":{"clazz":"sub_HealthCare subcategory","value":"Poison_control_centre","name":"Poison_control_centre","img":"HealthCare_Poison_control_centre.png"}},
    {"201":{"clazz":"sub_HealthCare subcategory","value":"Private_clinic","name":"Private_clinic","img":"HealthCare_Private_clinic.png"}},
    {"202":{"clazz":"sub_HealthCare subcategory","value":"Psychologists","name":"Psychologists","img":"HealthCare_Psychologists.png"}},
    {"203":{"clazz":"sub_HealthCare subcategory","value":"Public_hospital","name":"Public_hospital","img":"HealthCare_Public_hospital.png"}},
    {"204":{"clazz":"sub_HealthCare subcategory","value":"Red_cross","name":"Red_cross","img":"HealthCare_Red_cross.png"}},
    {"205":{"clazz":"sub_HealthCare subcategory","value":"Residential_care_activities","name":"Residential_care_activities","img":"HealthCare_Residential_care_activities.png"}},
    {"206":{"clazz":"sub_HealthCare subcategory","value":"Senior_centre","name":"Senior_centre","img":"HealthCare_Senior_centre.png"}},
    {"207":{"clazz":"sub_HealthCare subcategory","value":"Social_work","name":"Social_work","img":"HealthCare_Social_work.png"}},
    {"208":{"clazz":"sub_HealthCare subcategory","value":"Youth_assistance","name":"Youth_assistance","img":"HealthCare_Youth_assistance.png"}},
    {"209":{"clazz":"macrocategory","value":"IndustryAndManufacturing","name":"IndustryAndManufacturing","img":"IndustryAndManufacturing.png"}},
    {"210":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Animal_feeds_manufacture","name":"Animal_feeds_manufacture","img":"IndustryAndManufacturing_Animal_feeds_manufacture.png"}},
    {"211":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Beverage_manufacture","name":"Beverage_manufacture","img":"IndustryAndManufacturing_Beverage_manufacture.png"}},
    {"212":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Building_materials_manufacture","name":"Building_materials_manufacture","img":"IndustryAndManufacturing_Building_materials_manufacture.png"}},
    {"213":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Coke_and_petroleum_derivatives","name":"Coke_and_petroleum_derivatives","img":"IndustryAndManufacturing_Coke_and_petroleum_derivatives.png"}},
    {"214":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Computer_data_processing","name":"Computer_data_processing","img":"IndustryAndManufacturing_Computer_data_processing.png"}},
    {"215":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Computer_programming_and_consultancy","name":"Computer_programming_and_consultancy","img":"IndustryAndManufacturing_Computer_programming_and_consultancy.png"}},
    {"216":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Food_manufacture","name":"Food_manufacture","img":"IndustryAndManufacturing_Food_manufacture.png"}},
    {"217":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Footwear_manufacture","name":"Footwear_manufacture","img":"IndustryAndManufacturing_Footwear_manufacture.png"}},
    {"218":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Ict_service","name":"Ict_service","img":"IndustryAndManufacturing_Ict_service.png"}},
    {"219":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Installation_of_industrial_machinery","name":"Installation_of_industrial_machinery","img":"IndustryAndManufacturing_Installation_of_industrial_machinery.png"}},
    {"220":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Knitted_manufacture","name":"Knitted_manufacture","img":"IndustryAndManufacturing_Knitted_manufacture.png"}},
    {"221":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Leather_manufacture","name":"Leather_manufacture","img":"IndustryAndManufacturing_Leather_manufacture.png"}},
    {"222":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Machinery_repair_and_installation","name":"Machinery_repair_and_installation","img":"IndustryAndManufacturing_Machinery_repair_and_installation.png"}},
    {"223":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Manufacture_of_basic_metals","name":"Manufacture_of_basic_metals","img":"IndustryAndManufacturing_Manufacture_of_basic_metals.png"}},
    {"224":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Manufacture_of_chemicals_products","name":"Manufacture_of_chemicals_products","img":"IndustryAndManufacturing_Manufacture_of_chemicals_products.png"}},
    {"225":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Manufacture_of_clay_and_ceramic","name":"Manufacture_of_clay_and_ceramic","img":"IndustryAndManufacturing_Manufacture_of_clay_and_ceramic.png"}},
    {"226":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Manufacture_of_electrical_equipment","name":"Manufacture_of_electrical_equipment","img":"IndustryAndManufacturing_Manufacture_of_electrical_equipment.png"}},
    {"227":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Manufacture_of_electronic_products","name":"Manufacture_of_electronic_products","img":"IndustryAndManufacturing_Manufacture_of_electronic_products.png"}},
    {"228":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Manufacture_of_furniture","name":"Manufacture_of_furniture","img":"IndustryAndManufacturing_Manufacture_of_furniture.png"}},
    {"229":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Manufacture_of_glass","name":"Manufacture_of_glass","img":"IndustryAndManufacturing_Manufacture_of_glass.png"}},
    {"230":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Manufacture_of_jewellery_bijouterie","name":"Manufacture_of_jewellery_bijouterie","img":"IndustryAndManufacturing_Manufacture_of_jewellery_bijouterie.png"}},
    {"231":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Manufacture_of_machinery_and_equipment","name":"Manufacture_of_machinery_and_equipment","img":"IndustryAndManufacturing_Manufacture_of_machinery_and_equipment.png"}},
    {"232":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Manufacture_of_motor_vehicles","name":"Manufacture_of_motor_vehicles","img":"IndustryAndManufacturing_Manufacture_of_motor_vehicles.png"}},
    {"233":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Manufacture_of_musical_instruments","name":"Manufacture_of_musical_instruments","img":"IndustryAndManufacturing_Manufacture_of_musical_instruments.png"}},
    {"234":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Manufacture_of_non_metallic_mineral_products","name":"Manufacture_of_non_metallic_mineral_products","img":"IndustryAndManufacturing_Manufacture_of_non_metallic_mineral_products.png"}},
    {"235":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Manufacture_of_paper","name":"Manufacture_of_paper","img":"IndustryAndManufacturing_Manufacture_of_paper.png"}},
    {"236":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Manufacture_of_paper_products","name":"Manufacture_of_paper_products","img":"IndustryAndManufacturing_Manufacture_of_paper_products.png"}},
    {"237":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Manufacture_of_pharmaceutical_products","name":"Manufacture_of_pharmaceutical_products","img":"IndustryAndManufacturing_Manufacture_of_pharmaceutical_products.png"}},
    {"238":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Manufacture_of_plastics_products","name":"Manufacture_of_plastics_products","img":"IndustryAndManufacturing_Manufacture_of_plastics_products.png"}},
    {"239":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Manufacture_of_refined_petroleum_products","name":"Manufacture_of_refined_petroleum_products","img":"IndustryAndManufacturing_Manufacture_of_refined_petroleum_products.png"}},
    {"240":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Manufacture_of_refractory_products","name":"Manufacture_of_refractory_products","img":"IndustryAndManufacturing_Manufacture_of_refractory_products.png"}},
    {"241":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Manufacture_of_rubber_and_plastics_products","name":"Manufacture_of_rubber_and_plastics_products","img":"IndustryAndManufacturing_Manufacture_of_rubber_and_plastics_products.png"}},
    {"242":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Manufacture_of_rubber_products","name":"Manufacture_of_rubber_products","img":"IndustryAndManufacturing_Manufacture_of_rubber_products.png"}},
    {"243":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Manufacture_of_sports_goods","name":"Manufacture_of_sports_goods","img":"IndustryAndManufacturing_Manufacture_of_sports_goods.png"}},
    {"244":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Manufacture_of_structural_metal_products","name":"Manufacture_of_structural_metal_products","img":"IndustryAndManufacturing_Manufacture_of_structural_metal_products.png"}},
    {"245":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Manufacture_of_textiles","name":"Manufacture_of_textiles","img":"IndustryAndManufacturing_Manufacture_of_textiles.png"}},
    {"246":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Manufacture_of_toys_and_game","name":"Manufacture_of_toys_and_game","img":"IndustryAndManufacturing_Manufacture_of_toys_and_game.png"}},
    {"247":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Manufacture_of_transport_equipment","name":"Manufacture_of_transport_equipment","img":"IndustryAndManufacturing_Manufacture_of_transport_equipment.png"}},
    {"248":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Manufacture_of_travel_articles","name":"Manufacture_of_travel_articles","img":"IndustryAndManufacturing_Manufacture_of_travel_articles.png"}},
    {"249":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Manufacture_of_wearing_apparel","name":"Manufacture_of_wearing_apparel","img":"IndustryAndManufacturing_Manufacture_of_wearing_apparel.png"}},
    {"250":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Manufacture_of_wood","name":"Manufacture_of_wood","img":"IndustryAndManufacturing_Manufacture_of_wood.png"}},
    {"251":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Manufacture_of_wood_products","name":"Manufacture_of_wood_products","img":"IndustryAndManufacturing_Manufacture_of_wood_products.png"}},
    {"252":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Mining_support_services","name":"Mining_support_services","img":"IndustryAndManufacturing_Mining_support_services.png"}},
    {"253":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Other_manufacturing","name":"Other_manufacturing","img":"IndustryAndManufacturing_Other_manufacturing.png"}},
    {"254":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Quality_control_and_certification","name":"Quality_control_and_certification","img":"IndustryAndManufacturing_Quality_control_and_certification.png"}},
    {"255":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Sawmilling","name":"Sawmilling","img":"IndustryAndManufacturing_Sawmilling.png"}},
    {"256":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Software_publishing","name":"Software_publishing","img":"IndustryAndManufacturing_Software_publishing.png"}},
    {"257":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Specialized_design","name":"Specialized_design","img":"IndustryAndManufacturing_Specialized_design.png"}},
    {"258":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Stone_processing","name":"Stone_processing","img":"IndustryAndManufacturing_Stone_processing.png"}},
    {"259":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Tannery","name":"Tannery","img":"IndustryAndManufacturing_Tannery.png"}},
    {"260":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Technical_testing","name":"Technical_testing","img":"IndustryAndManufacturing_Technical_testing.png"}},
    {"261":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Textile_manufacturing","name":"Textile_manufacturing","img":"IndustryAndManufacturing_Textile_manufacturing.png"}},
    {"262":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Tobacco_industry","name":"Tobacco_industry","img":"IndustryAndManufacturing_Tobacco_industry.png"}},
    {"263":{"clazz":"sub_IndustryAndManufacturing subcategory","value":"Web_and_internet_provider","name":"Web_and_internet_provider","img":"IndustryAndManufacturing_Web_and_internet_provider.png"}},
    {"264":{"clazz":"macrocategory","value":"MiningAndQuarrying","name":"MiningAndQuarrying","img":"MiningAndQuarrying.png"}},
    {"265":{"clazz":"sub_MiningAndQuarrying subcategory","value":"Extraction_of_salt","name":"Extraction_of_salt","img":"MiningAndQuarrying_Extraction_of_salt.png"}},
    {"266":{"clazz":"sub_MiningAndQuarrying subcategory","value":"Mining_of_metal_ores","name":"Mining_of_metal_ores","img":"MiningAndQuarrying_Mining_of_metal_ores.png"}},
    {"267":{"clazz":"sub_MiningAndQuarrying subcategory","value":"Other_mining_and_quarrying","name":"Other_mining_and_quarrying","img":"MiningAndQuarrying_Other_mining_and_quarrying.png"}},
    {"268":{"clazz":"sub_MiningAndQuarrying subcategory","value":"Petroleum_and_natural_gas_extraction","name":"Petroleum_and_natural_gas_extraction","img":"MiningAndQuarrying_Petroleum_and_natural_gas_extraction.png"}},
    {"269":{"clazz":"sub_MiningAndQuarrying subcategory","value":"Quarrying_of_stone_sand_and_clay","name":"Quarrying_of_stone_sand_and_clay","img":"MiningAndQuarrying_Quarrying_of_stone_sand_and_clay.png"}},
    {"270":{"clazz":"macrocategory","value":"ShoppingAndService","name":"ShoppingAndService","img":"ShoppingAndService.png"}},
    {"271":{"clazz":"sub_ShoppingAndService subcategory","value":"Adult_clothing","name":"Adult_clothing","img":"ShoppingAndService_Adult_clothing.png"}},
    {"272":{"clazz":"sub_ShoppingAndService subcategory","value":"Antiques","name":"Antiques","img":"ShoppingAndService_Antiques.png"}},
    {"273":{"clazz":"sub_ShoppingAndService subcategory","value":"Artisan_shop","name":"Artisan_shop","img":"ShoppingAndService_Artisan_shop.png"}},
    {"274":{"clazz":"sub_ShoppingAndService subcategory","value":"Art_galleries","name":"Art_galleries","img":"ShoppingAndService_Art_galleries.png"}},
    {"275":{"clazz":"sub_ShoppingAndService subcategory","value":"Auctioning_houses","name":"Auctioning_houses","img":"ShoppingAndService_Auctioning_houses.png"}},
    {"276":{"clazz":"sub_ShoppingAndService subcategory","value":"Audio_and_video","name":"Audio_and_video","img":"ShoppingAndService_Audio_and_video.png"}},
    {"277":{"clazz":"sub_ShoppingAndService subcategory","value":"Beauty_centre","name":"Beauty_centre","img":"ShoppingAndService_Beauty_centre.png"}},
    {"278":{"clazz":"sub_ShoppingAndService subcategory","value":"Boat_equipment","name":"Boat_equipment","img":"ShoppingAndService_Boat_equipment.png"}},
    {"279":{"clazz":"sub_ShoppingAndService subcategory","value":"Bookshop","name":"Bookshop","img":"ShoppingAndService_Bookshop.png"}},
    {"280":{"clazz":"sub_ShoppingAndService subcategory","value":"Building_material","name":"Building_material","img":"ShoppingAndService_Building_material.png"}},
    {"281":{"clazz":"sub_ShoppingAndService subcategory","value":"Carpentry","name":"Carpentry","img":"ShoppingAndService_Carpentry.png"}},
    {"282":{"clazz":"sub_ShoppingAndService subcategory","value":"Carpets","name":"Carpets","img":"ShoppingAndService_Carpets.png"}},
    {"283":{"clazz":"sub_ShoppingAndService subcategory","value":"Carpets_and_curtains","name":"Carpets_and_curtains","img":"ShoppingAndService_Carpets_and_curtains.png"}},
    {"284":{"clazz":"sub_ShoppingAndService subcategory","value":"Car_washing","name":"Car_washing","img":"ShoppingAndService_Car_washing.png"}},
    {"285":{"clazz":"sub_ShoppingAndService subcategory","value":"Cleaning_materials","name":"Cleaning_materials","img":"ShoppingAndService_Cleaning_materials.png"}},
    {"286":{"clazz":"sub_ShoppingAndService subcategory","value":"Clothing","name":"Clothing","img":"ShoppingAndService_Clothing.png"}},
    {"287":{"clazz":"sub_ShoppingAndService subcategory","value":"Clothing_accessories","name":"Clothing_accessories","img":"ShoppingAndService_Clothing_accessories.png"}},
    {"288":{"clazz":"sub_ShoppingAndService subcategory","value":"Clothing_and_linen","name":"Clothing_and_linen","img":"ShoppingAndService_Clothing_and_linen.png"}},
    {"289":{"clazz":"sub_ShoppingAndService subcategory","value":"Clothing_children_and_infants","name":"Clothing_children_and_infants","img":"ShoppingAndService_Clothing_children_and_infants.png"}},
    {"290":{"clazz":"sub_ShoppingAndService subcategory","value":"Clothing_factory_outlet","name":"Clothing_factory_outlet","img":"ShoppingAndService_Clothing_factory_outlet.png"}},
    {"291":{"clazz":"sub_ShoppingAndService subcategory","value":"Coffee_rosters","name":"Coffee_rosters","img":"ShoppingAndService_Coffee_rosters.png"}},
    {"292":{"clazz":"sub_ShoppingAndService subcategory","value":"Computer_systems","name":"Computer_systems","img":"ShoppingAndService_Computer_systems.png"}},
    {"293":{"clazz":"sub_ShoppingAndService subcategory","value":"Computer_technician","name":"Computer_technician","img":"ShoppingAndService_Computer_technician.png"}},
    {"294":{"clazz":"sub_ShoppingAndService subcategory","value":"Cultural_and_recreation_goods","name":"Cultural_and_recreation_goods","img":"ShoppingAndService_Cultural_and_recreation_goods.png"}},
    {"295":{"clazz":"sub_ShoppingAndService subcategory","value":"Curtains_and_net_curtains","name":"Curtains_and_net_curtains","img":"ShoppingAndService_Curtains_and_net_curtains.png"}},
    {"296":{"clazz":"sub_ShoppingAndService subcategory","value":"Dairy_products","name":"Dairy_products","img":"ShoppingAndService_Dairy_products.png"}},
    {"297":{"clazz":"sub_ShoppingAndService subcategory","value":"Dating_service","name":"Dating_service","img":"ShoppingAndService_Dating_service.png"}},
    {"298":{"clazz":"sub_ShoppingAndService subcategory","value":"Diet_products","name":"Diet_products","img":"ShoppingAndService_Diet_products.png"}},
    {"299":{"clazz":"sub_ShoppingAndService subcategory","value":"Discount","name":"Discount","img":"ShoppingAndService_Discount.png"}},
    {"300":{"clazz":"sub_ShoppingAndService subcategory","value":"Door_to_door","name":"Door_to_door","img":"ShoppingAndService_Door_to_door.png"}},
    {"301":{"clazz":"sub_ShoppingAndService subcategory","value":"Estate_activities","name":"Estate_activities","img":"ShoppingAndService_Estate_activities.png"}},
    {"302":{"clazz":"sub_ShoppingAndService subcategory","value":"Fine_arts_articles","name":"Fine_arts_articles","img":"ShoppingAndService_Fine_arts_articles.png"}},
    {"303":{"clazz":"sub_ShoppingAndService subcategory","value":"Fish_and_seafood","name":"Fish_and_seafood","img":"ShoppingAndService_Fish_and_seafood.png"}},
    {"304":{"clazz":"sub_ShoppingAndService subcategory","value":"Flower_shop","name":"Flower_shop","img":"ShoppingAndService_Flower_shop.png"}},
    {"305":{"clazz":"sub_ShoppingAndService subcategory","value":"Food_and_tobacconist","name":"Food_and_tobacconist","img":"ShoppingAndService_Food_and_tobacconist.png"}},
    {"306":{"clazz":"sub_ShoppingAndService subcategory","value":"Footwear_and_accessories","name":"Footwear_and_accessories","img":"ShoppingAndService_Footwear_and_accessories.png"}},
    {"307":{"clazz":"sub_ShoppingAndService subcategory","value":"Footwear_and_leather_goods","name":"Footwear_and_leather_goods","img":"ShoppingAndService_Footwear_and_leather_goods.png"}},
    {"308":{"clazz":"sub_ShoppingAndService subcategory","value":"Footwear_factory_outlet","name":"Footwear_factory_outlet","img":"ShoppingAndService_Footwear_factory_outlet.png"}},
    {"309":{"clazz":"sub_ShoppingAndService subcategory","value":"Frozen_food","name":"Frozen_food","img":"ShoppingAndService_Frozen_food.png"}},
    {"310":{"clazz":"sub_ShoppingAndService subcategory","value":"Fruit_and_vegetables","name":"Fruit_and_vegetables","img":"ShoppingAndService_Fruit_and_vegetables.png"}},
    {"311":{"clazz":"sub_ShoppingAndService subcategory","value":"Funeral","name":"Funeral","img":"ShoppingAndService_Funeral.png"}},
    {"312":{"clazz":"sub_ShoppingAndService subcategory","value":"Funeral_and_cemetery_articles","name":"Funeral_and_cemetery_articles","img":"ShoppingAndService_Funeral_and_cemetery_articles.png"}},
    {"313":{"clazz":"sub_ShoppingAndService subcategory","value":"Fur_and_leather_clothing","name":"Fur_and_leather_clothing","img":"ShoppingAndService_Fur_and_leather_clothing.png"}},
    {"314":{"clazz":"sub_ShoppingAndService subcategory","value":"Games_and_toys","name":"Games_and_toys","img":"ShoppingAndService_Games_and_toys.png"}},
    {"315":{"clazz":"sub_ShoppingAndService subcategory","value":"Garden_and_agriculture","name":"Garden_and_agriculture","img":"ShoppingAndService_Garden_and_agriculture.png"}},
    {"316":{"clazz":"sub_ShoppingAndService subcategory","value":"Gifts_and_smoking_articles","name":"Gifts_and_smoking_articles","img":"ShoppingAndService_Gifts_and_smoking_articles.png"}},
    {"317":{"clazz":"sub_ShoppingAndService subcategory","value":"Haberdashery","name":"Haberdashery","img":"ShoppingAndService_Haberdashery.png"}},
    {"318":{"clazz":"sub_ShoppingAndService subcategory","value":"Hairdressing","name":"Hairdressing","img":"ShoppingAndService_Hairdressing.png"}},
    {"319":{"clazz":"sub_ShoppingAndService subcategory","value":"Hairdressing_and_beauty_treatment","name":"Hairdressing_and_beauty_treatment","img":"ShoppingAndService_Hairdressing_and_beauty_treatment.png"}},
    {"320":{"clazz":"sub_ShoppingAndService subcategory","value":"Hardware_electrical_plumbing_and_heating","name":"Hardware_electrical_plumbing_and_heating","img":"ShoppingAndService_Hardware_electrical_plumbing_and_heating.png"}},
    {"321":{"clazz":"sub_ShoppingAndService subcategory","value":"Hardware_paints_and_glass","name":"Hardware_paints_and_glass","img":"ShoppingAndService_Hardware_paints_and_glass.png"}},
    {"322":{"clazz":"sub_ShoppingAndService subcategory","value":"Herbalists_shop","name":"Herbalists_shop","img":"ShoppingAndService_Herbalists_shop.png"}},
    {"323":{"clazz":"sub_ShoppingAndService subcategory","value":"Household_appliances_shop","name":"Household_appliances_shop","img":"ShoppingAndService_Household_appliances_shop.png"}},
    {"324":{"clazz":"sub_ShoppingAndService subcategory","value":"Household_articles","name":"Household_articles","img":"ShoppingAndService_Household_articles.png"}},
    {"325":{"clazz":"sub_ShoppingAndService subcategory","value":"Household_fuel","name":"Household_fuel","img":"ShoppingAndService_Household_fuel.png"}},
    {"326":{"clazz":"sub_ShoppingAndService subcategory","value":"Household_furniture","name":"Household_furniture","img":"ShoppingAndService_Household_furniture.png"}},
    {"327":{"clazz":"sub_ShoppingAndService subcategory","value":"Household_products","name":"Household_products","img":"ShoppingAndService_Household_products.png"}},
    {"328":{"clazz":"sub_ShoppingAndService subcategory","value":"Household_utensils","name":"Household_utensils","img":"ShoppingAndService_Household_utensils.png"}},
    {"329":{"clazz":"sub_ShoppingAndService subcategory","value":"Hypermarket","name":"Hypermarket","img":"ShoppingAndService_Hypermarket.png"}},
    {"330":{"clazz":"sub_ShoppingAndService subcategory","value":"Industrial_laundries","name":"Industrial_laundries","img":"ShoppingAndService_Industrial_laundries.png"}},
    {"331":{"clazz":"sub_ShoppingAndService subcategory","value":"Jeweller","name":"Jeweller","img":"ShoppingAndService_Jeweller.png"}},
    {"332":{"clazz":"sub_ShoppingAndService subcategory","value":"Jewellery","name":"Jewellery","img":"ShoppingAndService_Jewellery.png"}},
    {"333":{"clazz":"sub_ShoppingAndService subcategory","value":"Laundries_and_dry_cleaners","name":"Laundries_and_dry_cleaners","img":"ShoppingAndService_Laundries_and_dry_cleaners.png"}},
    {"334":{"clazz":"sub_ShoppingAndService subcategory","value":"Lighting","name":"Lighting","img":"ShoppingAndService_Lighting.png"}},
    {"335":{"clazz":"sub_ShoppingAndService subcategory","value":"Maintenance_repair_of_motorcycles","name":"Maintenance_repair_of_motorcycles","img":"ShoppingAndService_Maintenance_repair_of_motorcycles.png"}},
    {"336":{"clazz":"sub_ShoppingAndService subcategory","value":"Maintenance_repair_of_motor_vehicles","name":"Maintenance_repair_of_motor_vehicles","img":"ShoppingAndService_Maintenance_repair_of_motor_vehicles.png"}},
    {"337":{"clazz":"sub_ShoppingAndService subcategory","value":"Manicure_and_pedicure","name":"Manicure_and_pedicure","img":"ShoppingAndService_Manicure_and_pedicure.png"}},
    {"338":{"clazz":"sub_ShoppingAndService subcategory","value":"Meat_and_poultry","name":"Meat_and_poultry","img":"ShoppingAndService_Meat_and_poultry.png"}},
    {"339":{"clazz":"sub_ShoppingAndService subcategory","value":"Mechanic_workshop","name":"Mechanic_workshop","img":"ShoppingAndService_Mechanic_workshop.png"}},
    {"340":{"clazz":"sub_ShoppingAndService subcategory","value":"Medical_and_orthopaedic_goods","name":"Medical_and_orthopaedic_goods","img":"ShoppingAndService_Medical_and_orthopaedic_goods.png"}},
    {"341":{"clazz":"sub_ShoppingAndService subcategory","value":"Minimarket","name":"Minimarket","img":"ShoppingAndService_Minimarket.png"}},
    {"342":{"clazz":"sub_ShoppingAndService subcategory","value":"Motorcycles_parts_wholesale_and_retail","name":"Motorcycles_parts_wholesale_and_retail","img":"ShoppingAndService_Motorcycles_parts_wholesale_and_retail.png"}},
    {"343":{"clazz":"sub_ShoppingAndService subcategory","value":"Motorcycles_wholesale_and_retail","name":"Motorcycles_wholesale_and_retail","img":"ShoppingAndService_Motorcycles_wholesale_and_retail.png"}},
    {"344":{"clazz":"sub_ShoppingAndService subcategory","value":"Motor_vehicles_wholesale_and_retail","name":"Motor_vehicles_wholesale_and_retail","img":"ShoppingAndService_Motor_vehicles_wholesale_and_retail.png"}},
    {"345":{"clazz":"sub_ShoppingAndService subcategory","value":"Musical_instruments_and_scores","name":"Musical_instruments_and_scores","img":"ShoppingAndService_Musical_instruments_and_scores.png"}},
    {"346":{"clazz":"sub_ShoppingAndService subcategory","value":"Music_and_video_recordings","name":"Music_and_video_recordings","img":"ShoppingAndService_Music_and_video_recordings.png"}},
    {"347":{"clazz":"sub_ShoppingAndService subcategory","value":"Newspapers_and_stationery","name":"Newspapers_and_stationery","img":"ShoppingAndService_Newspapers_and_stationery.png"}},
    {"348":{"clazz":"sub_ShoppingAndService subcategory","value":"Non_food_large_retailers","name":"Non_food_large_retailers","img":"ShoppingAndService_Non_food_large_retailers.png"}},
    {"349":{"clazz":"sub_ShoppingAndService subcategory","value":"Non_food_products","name":"Non_food_products","img":"ShoppingAndService_Non_food_products.png"}},
    {"350":{"clazz":"sub_ShoppingAndService subcategory","value":"Office_furniture","name":"Office_furniture","img":"ShoppingAndService_Office_furniture.png"}},
    {"351":{"clazz":"sub_ShoppingAndService subcategory","value":"Optics_and_photography","name":"Optics_and_photography","img":"ShoppingAndService_Optics_and_photography.png"}},
    {"352":{"clazz":"sub_ShoppingAndService subcategory","value":"Other_goods","name":"Other_goods","img":"ShoppingAndService_Other_goods.png"}},
    {"353":{"clazz":"sub_ShoppingAndService subcategory","value":"Other_retail_sale","name":"Other_retail_sale","img":"ShoppingAndService_Other_retail_sale.png"}},
    {"354":{"clazz":"sub_ShoppingAndService subcategory","value":"Parties_and_ceremonies","name":"Parties_and_ceremonies","img":"ShoppingAndService_Parties_and_ceremonies.png"}},
    {"355":{"clazz":"sub_ShoppingAndService subcategory","value":"Perfumery_and_cosmetic_articles","name":"Perfumery_and_cosmetic_articles","img":"ShoppingAndService_Perfumery_and_cosmetic_articles.png"}},
    {"356":{"clazz":"sub_ShoppingAndService subcategory","value":"Personal_service_activities","name":"Personal_service_activities","img":"ShoppingAndService_Personal_service_activities.png"}},
    {"357":{"clazz":"sub_ShoppingAndService subcategory","value":"Pet_care_services","name":"Pet_care_services","img":"ShoppingAndService_Pet_care_services.png"}},
    {"358":{"clazz":"sub_ShoppingAndService subcategory","value":"Pet_shop","name":"Pet_shop","img":"ShoppingAndService_Pet_shop.png"}},
    {"359":{"clazz":"sub_ShoppingAndService subcategory","value":"Pharmaceuticals","name":"Pharmaceuticals","img":"ShoppingAndService_Pharmaceuticals.png"}},
    {"360":{"clazz":"sub_ShoppingAndService subcategory","value":"Pharmacy","name":"Pharmacy","img":"ShoppingAndService_Pharmacy.png"}},
    {"361":{"clazz":"sub_ShoppingAndService subcategory","value":"Repair","name":"Repair","img":"ShoppingAndService_Repair.png"}},
    {"362":{"clazz":"sub_ShoppingAndService subcategory","value":"Repair_musical_instruments","name":"Repair_musical_instruments","img":"ShoppingAndService_Repair_musical_instruments.png"}},
    {"363":{"clazz":"sub_ShoppingAndService subcategory","value":"Repair_of_communication_equipment","name":"Repair_of_communication_equipment","img":"ShoppingAndService_Repair_of_communication_equipment.png"}},
    {"364":{"clazz":"sub_ShoppingAndService subcategory","value":"Repair_of_consumer_electronics","name":"Repair_of_consumer_electronics","img":"ShoppingAndService_Repair_of_consumer_electronics.png"}},
    {"365":{"clazz":"sub_ShoppingAndService subcategory","value":"Repair_of_footwear_and_leather_goods","name":"Repair_of_footwear_and_leather_goods","img":"ShoppingAndService_Repair_of_footwear_and_leather_goods.png"}},
    {"366":{"clazz":"sub_ShoppingAndService subcategory","value":"Repair_of_garden_equipment","name":"Repair_of_garden_equipment","img":"ShoppingAndService_Repair_of_garden_equipment.png"}},
    {"367":{"clazz":"sub_ShoppingAndService subcategory","value":"Repair_of_home_equipment","name":"Repair_of_home_equipment","img":"ShoppingAndService_Repair_of_home_equipment.png"}},
    {"368":{"clazz":"sub_ShoppingAndService subcategory","value":"Repair_of_household_appliances","name":"Repair_of_household_appliances","img":"ShoppingAndService_Repair_of_household_appliances.png"}},
    {"369":{"clazz":"sub_ShoppingAndService subcategory","value":"Repair_of_sporting_goods","name":"Repair_of_sporting_goods","img":"ShoppingAndService_Repair_of_sporting_goods.png"}},
    {"370":{"clazz":"sub_ShoppingAndService subcategory","value":"Restorers","name":"Restorers","img":"ShoppingAndService_Restorers.png"}},
    {"371":{"clazz":"sub_ShoppingAndService subcategory","value":"Retail_motor_vehicles_parts","name":"Retail_motor_vehicles_parts","img":"ShoppingAndService_Retail_motor_vehicles_parts.png"}},
    {"372":{"clazz":"sub_ShoppingAndService subcategory","value":"Retail_sale_non_specialized_stores","name":"Retail_sale_non_specialized_stores","img":"ShoppingAndService_Retail_sale_non_specialized_stores.png"}},
    {"373":{"clazz":"sub_ShoppingAndService subcategory","value":"Retail_trade","name":"Retail_trade","img":"ShoppingAndService_Retail_trade.png"}},
    {"374":{"clazz":"sub_ShoppingAndService subcategory","value":"Rope_cord_and_twine","name":"Rope_cord_and_twine","img":"ShoppingAndService_Rope_cord_and_twine.png"}},
    {"375":{"clazz":"sub_ShoppingAndService subcategory","value":"Sale_motor_vehicles_parts","name":"Sale_motor_vehicles_parts","img":"ShoppingAndService_Sale_motor_vehicles_parts.png"}},
    {"376":{"clazz":"sub_ShoppingAndService subcategory","value":"Sale_of_motorcycles","name":"Sale_of_motorcycles","img":"ShoppingAndService_Sale_of_motorcycles.png"}},
    {"377":{"clazz":"sub_ShoppingAndService subcategory","value":"Sale_of_motor_vehicles","name":"Sale_of_motor_vehicles","img":"ShoppingAndService_Sale_of_motor_vehicles.png"}},
    {"378":{"clazz":"sub_ShoppingAndService subcategory","value":"Sale_of_motor_vehicles_and_motorcycles","name":"Sale_of_motor_vehicles_and_motorcycles","img":"ShoppingAndService_Sale_of_motor_vehicles_and_motorcycles.png"}},
    {"379":{"clazz":"sub_ShoppingAndService subcategory","value":"Sale_via_mail_order_houses_or_via_internet","name":"Sale_via_mail_order_houses_or_via_internet","img":"ShoppingAndService_Sale_via_mail_order_houses_or_via_internet.png"}},
    {"380":{"clazz":"sub_ShoppingAndService subcategory","value":"Sanitary_equipment","name":"Sanitary_equipment","img":"ShoppingAndService_Sanitary_equipment.png"}},
    {"381":{"clazz":"sub_ShoppingAndService subcategory","value":"Second_hand_books","name":"Second_hand_books","img":"ShoppingAndService_Second_hand_books.png"}},
    {"382":{"clazz":"sub_ShoppingAndService subcategory","value":"Second_hand_goods","name":"Second_hand_goods","img":"ShoppingAndService_Second_hand_goods.png"}},
    {"383":{"clazz":"sub_ShoppingAndService subcategory","value":"Security_systems","name":"Security_systems","img":"ShoppingAndService_Security_systems.png"}},
    {"384":{"clazz":"sub_ShoppingAndService subcategory","value":"Sexy_shop","name":"Sexy_shop","img":"ShoppingAndService_Sexy_shop.png"}},
    {"385":{"clazz":"sub_ShoppingAndService subcategory","value":"Shopping_centre","name":"Shopping_centre","img":"ShoppingAndService_Shopping_centre.png"}},
    {"386":{"clazz":"sub_ShoppingAndService subcategory","value":"Single_brand_store","name":"Single_brand_store","img":"ShoppingAndService_Single_brand_store.png"}},
    {"387":{"clazz":"sub_ShoppingAndService subcategory","value":"Small_household_appliances","name":"Small_household_appliances","img":"ShoppingAndService_Small_household_appliances.png"}},
    {"388":{"clazz":"sub_ShoppingAndService subcategory","value":"Souvenirs_craftwork_and_religious_articles","name":"Souvenirs_craftwork_and_religious_articles","img":"ShoppingAndService_Souvenirs_craftwork_and_religious_articles.png"}},
    {"389":{"clazz":"sub_ShoppingAndService subcategory","value":"Sporting_equipment","name":"Sporting_equipment","img":"ShoppingAndService_Sporting_equipment.png"}},
    {"390":{"clazz":"sub_ShoppingAndService subcategory","value":"Stalls_and_markets","name":"Stalls_and_markets","img":"ShoppingAndService_Stalls_and_markets.png"}},
    {"391":{"clazz":"sub_ShoppingAndService subcategory","value":"Stalls_and_markets_of_clothing_and_footwear","name":"Stalls_and_markets_of_clothing_and_footwear","img":"ShoppingAndService_Stalls_and_markets_of_clothing_and_footwear.png"}},
    {"392":{"clazz":"sub_ShoppingAndService subcategory","value":"Stalls_and_markets_of_food","name":"Stalls_and_markets_of_food","img":"ShoppingAndService_Stalls_and_markets_of_food.png"}},
    {"393":{"clazz":"sub_ShoppingAndService subcategory","value":"Stalls_and_markets_other_goods","name":"Stalls_and_markets_other_goods","img":"ShoppingAndService_Stalls_and_markets_other_goods.png"}},
    {"394":{"clazz":"sub_ShoppingAndService subcategory","value":"Stamps_and_coins","name":"Stamps_and_coins","img":"ShoppingAndService_Stamps_and_coins.png"}},
    {"395":{"clazz":"sub_ShoppingAndService subcategory","value":"Supermarket","name":"Supermarket","img":"ShoppingAndService_Supermarket.png"}},
    {"396":{"clazz":"sub_ShoppingAndService subcategory","value":"Tattoo_and_piercing","name":"Tattoo_and_piercing","img":"ShoppingAndService_Tattoo_and_piercing.png"}},
    {"397":{"clazz":"sub_ShoppingAndService subcategory","value":"Telecommunications","name":"Telecommunications","img":"ShoppingAndService_Telecommunications.png"}},
    {"398":{"clazz":"sub_ShoppingAndService subcategory","value":"Textiles_products","name":"Textiles_products","img":"ShoppingAndService_Textiles_products.png"}},
    {"399":{"clazz":"sub_ShoppingAndService subcategory","value":"Tobacco_shop","name":"Tobacco_shop","img":"ShoppingAndService_Tobacco_shop.png"}},
    {"400":{"clazz":"sub_ShoppingAndService subcategory","value":"Travel_goods","name":"Travel_goods","img":"ShoppingAndService_Travel_goods.png"}},
    {"401":{"clazz":"sub_ShoppingAndService subcategory","value":"Trinkets","name":"Trinkets","img":"ShoppingAndService_Trinkets.png"}},
    {"402":{"clazz":"sub_ShoppingAndService subcategory","value":"Underwear_knitwear_and_shirts","name":"Underwear_knitwear_and_shirts","img":"ShoppingAndService_Underwear_knitwear_and_shirts.png"}},
    {"403":{"clazz":"sub_ShoppingAndService subcategory","value":"Upholsterer","name":"Upholsterer","img":"ShoppingAndService_Upholsterer.png"}},
    {"404":{"clazz":"sub_ShoppingAndService subcategory","value":"Vacating_service","name":"Vacating_service","img":"ShoppingAndService_Vacating_service.png"}},
    {"405":{"clazz":"sub_ShoppingAndService subcategory","value":"Vehicle_trade","name":"Vehicle_trade","img":"ShoppingAndService_Vehicle_trade.png"}},
    {"406":{"clazz":"sub_ShoppingAndService subcategory","value":"Vending_machines","name":"Vending_machines","img":"ShoppingAndService_Vending_machines.png"}},
    {"407":{"clazz":"sub_ShoppingAndService subcategory","value":"Wallpaper_and_floor_coverings","name":"Wallpaper_and_floor_coverings","img":"ShoppingAndService_Wallpaper_and_floor_coverings.png"}},
    {"408":{"clazz":"sub_ShoppingAndService subcategory","value":"Weapons_and_ammunition","name":"Weapons_and_ammunition","img":"ShoppingAndService_Weapons_and_ammunition.png"}},
    {"409":{"clazz":"sub_ShoppingAndService subcategory","value":"Wedding_favors","name":"Wedding_favors","img":"ShoppingAndService_Wedding_favors.png"}},
    {"410":{"clazz":"sub_ShoppingAndService subcategory","value":"Wellness_centre","name":"Wellness_centre","img":"ShoppingAndService_Wellness_centre.png"}},
    {"411":{"clazz":"macrocategory","value":"TourismService","name":"TourismService","img":"TourismService.png"}},
    {"412":{"clazz":"sub_TourismService subcategory","value":"Beacon","name":"Beacon","img":"TourismService_Beacon.png"}},
    {"413":{"clazz":"sub_TourismService subcategory","value":"Camper_service","name":"Camper_service","img":"TourismService_Camper_service.png"}},
    {"414":{"clazz":"sub_TourismService subcategory","value":"Fresh_place","name":"Fresh_place","img":"TourismService_Fresh_place.png"}},
    {"415":{"clazz":"sub_TourismService subcategory","value":"Pedestrian_zone","name":"Pedestrian_zone","img":"TourismService_Pedestrian_zone.png"}},
    {"416":{"clazz":"sub_TourismService subcategory","value":"Ticket_sale","name":"Ticket_sale","img":"TourismService_Ticket_sale.png"}},
    {"417":{"clazz":"sub_TourismService subcategory","value":"Toilet","name":"Toilet","img":"TourismService_Toilet.png"}},
    {"418":{"clazz":"sub_TourismService subcategory","value":"Tourist_complaints_office","name":"Tourist_complaints_office","img":"TourismService_Tourist_complaints_office.png"}},
    {"419":{"clazz":"sub_TourismService subcategory","value":"Tourist_guides","name":"Tourist_guides","img":"TourismService_Tourist_guides.png"}},
    {"420":{"clazz":"sub_TourismService subcategory","value":"Tourist_information_office","name":"Tourist_information_office","img":"TourismService_Tourist_information_office.png"}},
    {"421":{"clazz":"sub_TourismService subcategory","value":"Tourist_trail","name":"Tourist_trail","img":"TourismService_Tourist_trail.png"}},
    {"422":{"clazz":"sub_TourismService subcategory","value":"Tour_operator","name":"Tour_operator","img":"TourismService_Tour_operator.png"}},
    {"423":{"clazz":"sub_TourismService subcategory","value":"Travel_agency","name":"Travel_agency","img":"TourismService_Travel_agency.png"}},
    {"424":{"clazz":"sub_TourismService subcategory","value":"Travel_bureau","name":"Travel_bureau","img":"TourismService_Travel_bureau.png"}},
    {"425":{"clazz":"sub_TourismService subcategory","value":"Travel_information","name":"Travel_information","img":"TourismService_Travel_information.png"}},
    {"426":{"clazz":"sub_TourismService subcategory","value":"Wifi","name":"Wifi","img":"TourismService_Wifi.png"}},
    {"427":{"clazz":"macrocategory","value":"TransferServiceAndRenting","name":"TransferServiceAndRenting","img":"TransferServiceAndRenting.png"}},
    {"428":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Airfields","name":"Airfields","img":"TransferServiceAndRenting_Airfields.png"}},
    {"429":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Airplanes_rental","name":"Airplanes_rental","img":"TransferServiceAndRenting_Airplanes_rental.png"}},
    {"430":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Bike_rack","name":"Bike_rack","img":"TransferServiceAndRenting_Bike_rack.png"}},
    {"431":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Bike_rental","name":"Bike_rental","img":"TransferServiceAndRenting_Bike_rental.png"}},
    {"432":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Boats_and_ships_rental","name":"Boats_and_ships_rental","img":"TransferServiceAndRenting_Boats_and_ships_rental.png"}},
    {"433":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"BusStop","name":"BusStop","img":"TransferServiceAndRenting_BusStop.png"}},
    {"434":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Bus_tickets_retail","name":"Bus_tickets_retail","img":"TransferServiceAndRenting_Bus_tickets_retail.png"}},
    {"435":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Cargo_handling","name":"Cargo_handling","img":"TransferServiceAndRenting_Cargo_handling.png"}},
    {"436":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Car_park","name":"Car_park","img":"TransferServiceAndRenting_Car_park.png"}},
    {"437":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Car_rental_with_driver","name":"Car_rental_with_driver","img":"TransferServiceAndRenting_Car_rental_with_driver.png"}},
    {"438":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Charging_stations","name":"Charging_stations","img":"TransferServiceAndRenting_Charging_stations.png"}},
    {"439":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Charter_airlines","name":"Charter_airlines","img":"TransferServiceAndRenting_Charter_airlines.png"}},
    {"440":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Civil_airport","name":"Civil_airport","img":"TransferServiceAndRenting_Civil_airport.png"}},
    {"441":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Controlled_parking_zone","name":"Controlled_parking_zone","img":"TransferServiceAndRenting_Controlled_parking_zone.png"}},
    {"442":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Courier","name":"Courier","img":"TransferServiceAndRenting_Courier.png"}},
    {"443":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Cycle_paths","name":"Cycle_paths","img":"TransferServiceAndRenting_Cycle_paths.png"}},
    {"444":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Flight_companies","name":"Flight_companies","img":"TransferServiceAndRenting_Flight_companies.png"}},
    {"445":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Freight_transport_and_furniture_removal","name":"Freight_transport_and_furniture_removal","img":"TransferServiceAndRenting_Freight_transport_and_furniture_removal.png"}},
    {"446":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Fuel_station","name":"Fuel_station","img":"TransferServiceAndRenting_Fuel_station.png"}},
    {"447":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Helipads","name":"Helipads","img":"TransferServiceAndRenting_Helipads.png"}},
    {"448":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Land_transport","name":"Land_transport","img":"TransferServiceAndRenting_Land_transport.png"}},
    {"449":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Land_transport_rental","name":"Land_transport_rental","img":"TransferServiceAndRenting_Land_transport_rental.png"}},
    {"450":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Lifting_and_handling_equipment_rental","name":"Lifting_and_handling_equipment_rental","img":"TransferServiceAndRenting_Lifting_and_handling_equipment_rental.png"}},
    {"451":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Logistics_activities","name":"Logistics_activities","img":"TransferServiceAndRenting_Logistics_activities.png"}},
    {"452":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Passenger_air_transport","name":"Passenger_air_transport","img":"TransferServiceAndRenting_Passenger_air_transport.png"}},
    {"453":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Postal_and_courier_activities","name":"Postal_and_courier_activities","img":"TransferServiceAndRenting_Postal_and_courier_activities.png"}},
    {"454":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"RTZgate","name":"RTZgate","img":"TransferServiceAndRenting_RTZgate.png"}},
    {"455":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"SensorSite","name":"SensorSite","img":"TransferServiceAndRenting_SensorSite.png"}},
    {"456":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Support_activities_for_transportation","name":"Support_activities_for_transportation","img":"TransferServiceAndRenting_Support_activities_for_transportation.png"}},
    {"457":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Taxi_company","name":"Taxi_company","img":"TransferServiceAndRenting_Taxi_company.png"}},
    {"458":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Taxi_park","name":"Taxi_park","img":"TransferServiceAndRenting_Taxi_park.png"}},
    {"459":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Train_station","name":"Train_station","img":"TransferServiceAndRenting_Train_station.png"}},
    {"460":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Tramline","name":"Tramline","img":"TransferServiceAndRenting_Tramline.png"}},
    {"461":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Tram_stops","name":"Tram_stops","img":"TransferServiceAndRenting_Tram_stops.png"}},
    {"462":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Urban_bus","name":"Urban_bus","img":"TransferServiceAndRenting_Urban_bus.png"}},
    {"463":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Vehicle_rental","name":"Vehicle_rental","img":"TransferServiceAndRenting_Vehicle_rental.png"}},
    {"464":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Warehousing_and_storage","name":"Warehousing_and_storage","img":"TransferServiceAndRenting_Warehousing_and_storage.png"}},
    {"465":{"clazz":"sub_TransferServiceAndRenting subcategory","value":"Water_transport","name":"Water_transport","img":"TransferServiceAndRenting_Water_transport.png"}},
    {"466":{"clazz":"macrocategory","value":"UtilitiesAndSupply","name":"UtilitiesAndSupply","img":"UtilitiesAndSupply.png"}},
    {"467":{"clazz":"sub_UtilitiesAndSupply subcategory","value":"Accommodation_or_office_containers_rental","name":"Accommodation_or_office_containers_rental","img":"UtilitiesAndSupply_Accommodation_or_office_containers_rental.png"}},
    {"468":{"clazz":"sub_UtilitiesAndSupply subcategory","value":"Agents","name":"Agents","img":"UtilitiesAndSupply_Agents.png"}},
    {"469":{"clazz":"sub_UtilitiesAndSupply subcategory","value":"Associations","name":"Associations","img":"UtilitiesAndSupply_Associations.png"}},
    {"470":{"clazz":"sub_UtilitiesAndSupply subcategory","value":"Business_support","name":"Business_support","img":"UtilitiesAndSupply_Business_support.png"}},
    {"471":{"clazz":"sub_UtilitiesAndSupply subcategory","value":"Call_center","name":"Call_center","img":"UtilitiesAndSupply_Call_center.png"}},
    {"472":{"clazz":"sub_UtilitiesAndSupply subcategory","value":"Combined_facilities_support_activities","name":"Combined_facilities_support_activities","img":"UtilitiesAndSupply_Combined_facilities_support_activities.png"}},
    {"473":{"clazz":"sub_UtilitiesAndSupply subcategory","value":"Consulting_services","name":"Consulting_services","img":"UtilitiesAndSupply_Consulting_services.png"}},
    {"474":{"clazz":"sub_UtilitiesAndSupply subcategory","value":"Credit_collection_agencies","name":"Credit_collection_agencies","img":"UtilitiesAndSupply_Credit_collection_agencies.png"}},
    {"475":{"clazz":"sub_UtilitiesAndSupply subcategory","value":"Energy_supply","name":"Energy_supply","img":"UtilitiesAndSupply_Energy_supply.png"}},
    {"476":{"clazz":"sub_UtilitiesAndSupply subcategory","value":"Equipment_for_events_and_shows_rental","name":"Equipment_for_events_and_shows_rental","img":"UtilitiesAndSupply_Equipment_for_events_and_shows_rental.png"}},
    {"477":{"clazz":"sub_UtilitiesAndSupply subcategory","value":"Extraction_of_natural_gas","name":"Extraction_of_natural_gas","img":"UtilitiesAndSupply_Extraction_of_natural_gas.png"}},
    {"478":{"clazz":"sub_UtilitiesAndSupply subcategory","value":"Internet_point_and_public_telephone","name":"Internet_point_and_public_telephone","img":"UtilitiesAndSupply_Internet_point_and_public_telephone.png"}},
    {"479":{"clazz":"sub_UtilitiesAndSupply subcategory","value":"Internet_service_provider","name":"Internet_service_provider","img":"UtilitiesAndSupply_Internet_service_provider.png"}},
    {"480":{"clazz":"sub_UtilitiesAndSupply subcategory","value":"Investigation_activities","name":"Investigation_activities","img":"UtilitiesAndSupply_Investigation_activities.png"}},
    {"481":{"clazz":"sub_UtilitiesAndSupply subcategory","value":"Machinery_and_equipment_rental","name":"Machinery_and_equipment_rental","img":"UtilitiesAndSupply_Machinery_and_equipment_rental.png"}},
    {"482":{"clazz":"sub_UtilitiesAndSupply subcategory","value":"Management_consultancy","name":"Management_consultancy","img":"UtilitiesAndSupply_Management_consultancy.png"}},
    {"483":{"clazz":"sub_UtilitiesAndSupply subcategory","value":"Office_administrative_and_support_activities","name":"Office_administrative_and_support_activities","img":"UtilitiesAndSupply_Office_administrative_and_support_activities.png"}},
    {"484":{"clazz":"sub_UtilitiesAndSupply subcategory","value":"Organization_of_conventions_and_trade_shows","name":"Organization_of_conventions_and_trade_shows","img":"UtilitiesAndSupply_Organization_of_conventions_and_trade_shows.png"}},
    {"485":{"clazz":"sub_UtilitiesAndSupply subcategory","value":"Other_telecommunications_activities","name":"Other_telecommunications_activities","img":"UtilitiesAndSupply_Other_telecommunications_activities.png"}},
    {"486":{"clazz":"sub_UtilitiesAndSupply subcategory","value":"Packaging_activities","name":"Packaging_activities","img":"UtilitiesAndSupply_Packaging_activities.png"}},
    {"487":{"clazz":"sub_UtilitiesAndSupply subcategory","value":"Personal_and_household_goods_rental","name":"Personal_and_household_goods_rental","img":"UtilitiesAndSupply_Personal_and_household_goods_rental.png"}},
    {"488":{"clazz":"sub_UtilitiesAndSupply subcategory","value":"Private_security","name":"Private_security","img":"UtilitiesAndSupply_Private_security.png"}},
    {"489":{"clazz":"sub_UtilitiesAndSupply subcategory","value":"Recreational_and_sports_goods_rental","name":"Recreational_and_sports_goods_rental","img":"UtilitiesAndSupply_Recreational_and_sports_goods_rental.png"}},
    {"490":{"clazz":"sub_UtilitiesAndSupply subcategory","value":"Recruitment","name":"Recruitment","img":"UtilitiesAndSupply_Recruitment.png"}},
    {"491":{"clazz":"sub_UtilitiesAndSupply subcategory","value":"Reporting_agencies","name":"Reporting_agencies","img":"UtilitiesAndSupply_Reporting_agencies.png"}},
    {"492":{"clazz":"sub_UtilitiesAndSupply subcategory","value":"Secretarial_support_services","name":"Secretarial_support_services","img":"UtilitiesAndSupply_Secretarial_support_services.png"}},
    {"493":{"clazz":"sub_UtilitiesAndSupply subcategory","value":"Security_systems_service","name":"Security_systems_service","img":"UtilitiesAndSupply_Security_systems_service.png"}},
    {"494":{"clazz":"sub_UtilitiesAndSupply subcategory","value":"Temp_agency","name":"Temp_agency","img":"UtilitiesAndSupply_Temp_agency.png"}},
    {"495":{"clazz":"sub_UtilitiesAndSupply subcategory","value":"Video_tapes_disks_rental","name":"Video_tapes_disks_rental","img":"UtilitiesAndSupply_Video_tapes_disks_rental.png"}},
    {"496":{"clazz":"sub_UtilitiesAndSupply subcategory","value":"Water_collection_treatment_and_supply","name":"Water_collection_treatment_and_supply","img":"UtilitiesAndSupply_Water_collection_treatment_and_supply.png"}},
    {"497":{"clazz":"macrocategory","value":"Wholesale","name":"Wholesale","img":"Wholesale.png"}},
    {"498":{"clazz":"sub_Wholesale subcategory","value":"Non_specialized_wholesale_trade","name":"Non_specialized_wholesale_trade","img":"Wholesale_Non_specialized_wholesale_trade.png"}},
    {"499":{"clazz":"sub_Wholesale subcategory","value":"Other_specialized_wholesale","name":"Other_specialized_wholesale","img":"Wholesale_Other_specialized_wholesale.png"}},
    {"500":{"clazz":"sub_Wholesale subcategory","value":"Wholesale_agricultural_raw_materials_live_animals","name":"Wholesale_agricultural_raw_materials_live_animals","img":"Wholesale_Wholesale_agricultural_raw_materials_live_animals.png"}},
    {"501":{"clazz":"sub_Wholesale subcategory","value":"Wholesale_commission_trade","name":"Wholesale_commission_trade","img":"Wholesale_Wholesale_commission_trade.png"}},
    {"502":{"clazz":"sub_Wholesale subcategory","value":"Wholesale_food_beverages_tobacco","name":"Wholesale_food_beverages_tobacco","img":"Wholesale_Wholesale_food_beverages_tobacco.png"}},
    {"503":{"clazz":"sub_Wholesale subcategory","value":"Wholesale_household_goods","name":"Wholesale_household_goods","img":"Wholesale_Wholesale_household_goods.png"}},
    {"504":{"clazz":"sub_Wholesale subcategory","value":"Wholesale_ict_equipment","name":"Wholesale_ict_equipment","img":"Wholesale_Wholesale_ict_equipment.png"}},
    {"505":{"clazz":"sub_Wholesale subcategory","value":"Wholesale_machinery_equipmentent_supplies","name":"Wholesale_machinery_equipmentent_supplies","img":"Wholesale_Wholesale_machinery_equipmentent_supplies.png"}},
    {"506":{"clazz":"sub_Wholesale subcategory","value":"Wholesale_motor_vehicles_parts","name":"Wholesale_motor_vehicles_parts","img":"Wholesale_Wholesale_motor_vehicles_parts.png"}},
    {"507":{"clazz":"sub_Wholesale subcategory","value":"Wholesale_trade","name":"Wholesale_trade","img":"Wholesale_Wholesale_trade.png"}},
    {"508":{"clazz":"macrocategory","value":"WineAndFood","name":"WineAndFood","img":"WineAndFood.png"}},
    {"509":{"clazz":"sub_WineAndFood subcategory","value":"Bakery","name":"Bakery","img":"WineAndFood_Bakery.png"}},
    {"510":{"clazz":"sub_WineAndFood subcategory","value":"Bar","name":"Bar","img":"WineAndFood_Bar.png"}},
    {"511":{"clazz":"sub_WineAndFood subcategory","value":"Canteens_and_food_service","name":"Canteens_and_food_service","img":"WineAndFood_Canteens_and_food_service.png"}},
    {"512":{"clazz":"sub_WineAndFood subcategory","value":"Catering","name":"Catering","img":"WineAndFood_Catering.png"}},
    {"513":{"clazz":"sub_WineAndFood subcategory","value":"Dining_hall","name":"Dining_hall","img":"WineAndFood_Dining_hall.png"}},
    {"514":{"clazz":"sub_WineAndFood subcategory","value":"Drinking_fountain","name":"Drinking_fountain","img":"WineAndFood_Drinking_fountain.png"}},
    {"515":{"clazz":"sub_WineAndFood subcategory","value":"Food_and_ice_cream_truck","name":"Food_and_ice_cream_truck","img":"WineAndFood_Food_and_ice_cream_truck.png"}},
    {"516":{"clazz":"sub_WineAndFood subcategory","value":"Food_trade","name":"Food_trade","img":"WineAndFood_Food_trade.png"}},
    {"517":{"clazz":"sub_WineAndFood subcategory","value":"Grill","name":"Grill","img":"WineAndFood_Grill.png"}},
    {"518":{"clazz":"sub_WineAndFood subcategory","value":"Highway_stop","name":"Highway_stop","img":"WineAndFood_Highway_stop.png"}},
    {"519":{"clazz":"sub_WineAndFood subcategory","value":"Ice_cream_parlour","name":"Ice_cream_parlour","img":"WineAndFood_Ice_cream_parlour.png"}},
    {"520":{"clazz":"sub_WineAndFood subcategory","value":"Literary_cafe","name":"Literary_cafe","img":"WineAndFood_Literary_cafe.png"}},
    {"521":{"clazz":"sub_WineAndFood subcategory","value":"Pastry_shop","name":"Pastry_shop","img":"WineAndFood_Pastry_shop.png"}},
    {"522":{"clazz":"sub_WineAndFood subcategory","value":"Pizzeria","name":"Pizzeria","img":"WineAndFood_Pizzeria.png"}},
    {"523":{"clazz":"sub_WineAndFood subcategory","value":"Restaurant","name":"Restaurant","img":"WineAndFood_Restaurant.png"}},
    {"524":{"clazz":"sub_WineAndFood subcategory","value":"Sandwich_shop_pub","name":"Sandwich_shop_pub","img":"WineAndFood_Sandwich_shop_pub.png"}},
    {"525":{"clazz":"sub_WineAndFood subcategory","value":"Small_shop","name":"Small_shop","img":"WineAndFood_Small_shop.png"}},
    {"526":{"clazz":"sub_WineAndFood subcategory","value":"Sushi_bar","name":"Sushi_bar","img":"WineAndFood_Sushi_bar.png"}},
    {"527":{"clazz":"sub_WineAndFood subcategory","value":"Take_away","name":"Take_away","img":"WineAndFood_Take_away.png"}},
    {"528":{"clazz":"sub_WineAndFood subcategory","value":"Trattoria","name":"Trattoria","img":"WineAndFood_Trattoria.png"}},
    {"529":{"clazz":"sub_WineAndFood subcategory","value":"Wine_shop_and_wine_bar","name":"Wine_shop_and_wine_bar","img":"WineAndFood_Wine_shop_and_wine_bar.png"}}
]};

/***  Set constructor variable for leaflet_buildMap_support */
var leaflet_buildMap_support_2 = {
    // Get a list of marker with coordinates and a url href and put the marker on the map
    //initLeaflet: leafletUtil.initMap(),
    initMap: function () {
        leafletUtil.initMap();
    },
    addSingleMarker: function (name, url, lat, lng,bound,popupContent) {
        leafletUtil.addSingleMarker(name,url,lat,lng,bounds,popupContent);},
    pushMarkerToArrayMarker:
        function(nameVar,urlVar,latVar,lngVar,regionVar,provinceVar,
                 cityVar,addressVar,phoneVar,emailVar,faxVar,ivaVar,popupContentVar){
            leafletUtil.initMap(); //check fast if the map is setted
            leafletUtil.pushMarkerToArrayMarker(
                nameVar,urlVar,latVar,lngVar,regionVar,provinceVar,cityVar,
                addressVar,phoneVar,emailVar,faxVar,ivaVar,popupContentVar);
    },
    chooseIcon: function(code){ chooseIcon(code);},
    removeClusterMarker:leafletUtil.removeClusterMarker,
    getMarkers: leafletUtil.getMarkers
};

var bingAPIKey =
        'OOGpZK9MOAwIPsVuVTlE~D7N3xRehqhr3XJxlK8eMMg~Au-bt_oExU--ISxBKFtEXgSX-_AN6VMZSpM6rfKGY4xtAho6O67ueo2iN23gfbi0';
var googleAPIKey =
        'AIzaSyDlmsdr-wCDaHNbaBM6N9JljQLIjRllCl8';
var mapBoxAPIKey =
        'pk.eyJ1IjoiNDUzNTk5MiIsImEiOiJjaWdocXltNmMwc3Zud2JrbjdycWVrZG8zIn0.22EO_bIUp_3XUpt5dYjTRg';

/** Set the Leaflet.markercluster for Leaflet. https://github.com/Leaflet/Leaflet.markercluster */
var markerClusters = new L.MarkerClusterGroup({showCoverageOnHover: false, maxClusterRadius: 50});

//var geoCoderGoogle;

//----------------------------------------------------
//Field object support
//----------------------------------------------------

leafletUtil.geoDocument = {name:'',url:'',lat:'',lng:'',region:'',province:'',city:'',
    address:'',phone:'',email:'',fax:'',iva:'',popupContent:'',other:'',marker:{}};
leafletUtil.arrayGeoDocuments =[]; // array support of makers
leafletUtil.markerList = [];
leafletUtil.marker = {name:'',url:'',latitude:'',longitude:'',popupContent:'',category:'',id:''};
leafletUtil.arrayLatLng =[];
leafletUtil.icons = {};

leafletUtil.ctx = window.location.pathname.substring(0, window.location.pathname.indexOf("/",2));

//----------------------------------------------------
//Field object support Leaflet Controls
//----------------------------------------------------

/** Set the Leaflet Plugin Search. https://github.com/p4535992/leaflet-search.*/
leafletUtil.controlSearch = new L.Control.Search({layer: markerClusters, initial: false, position:'topright'});
/** Set the Leaflet Overlays Layer Map*/
leafletUtil.overlayMaps = {}; //Contaiiner of all Overlay Layer Maps
/** Set the Leaflet Base Layer Map*/
leafletUtil.baseMaps = null; //invoke setBaseMap on readyDocument
var btn; // simple glboal var for a button
/** Set the Leaflet Plugin LeafLet Geocoder. https://github.com/perliedman/leaflet-control-geocoder.*/
leafletUtil.geoCoderControl ={selection:{},geoCoderControl:{},selector:{},
    geocoders:{
        'Nominatim': L.Control.Geocoder.nominatim(),
        'Bing': L.Control.Geocoder.bing( bingAPIKey),
        'Mapbox': L.Control.Geocoder.mapbox( mapBoxAPIKey),
        'Google': L.Control.Geocoder.google( googleAPIKey),
        'Photon': L.Control.Geocoder.photon()
    },containerSelectorId:''
};
/** Set the Leaflet Plugin LeafLet FuseSearch. https://github.com/perliedman/leaflet-control-geocoder.*/
leafletUtil.fuseSearchCtrl = null;
/** Set the default Leaflet L.control.layers. */
leafletUtil.toggleMap = null; //invoke setToggleMaps on readyDocument
/** Set the Leaflet Plugin LeafLet grouped layer control. https://github.com/perliedman/leaflet-control-geocoder.*/
leafletUtil.groupedLayers = {};



//-----------------------------------------------------------------------------------
// SETTER UTILITY
//-----------------------------------------------------------------------------------
leafletUtil.setCtx = function(){
    var ctx;
    //OLD  leafletUtil.prepareCTX();
    if(window.location.pathname.indexOf("/",2) == -1){
        ctx =  window.location.toString().replace(window.location.pathname,'');
    }else{
        ctx = window.location.pathname.substring(0, window.location.pathname.indexOf("/",2));
    }
    //alert('set ctx:'+ctx);
    leafletUtil.ctx = ctx;
};

leafletUtil.setBaseMaps = function(){
    var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        mbUrl = 'https://{s}.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoicGJlbGxpbmkiLCJhIjoiNTQxZDNmNDY0NGZjYTk3YjlkNTAzNWQwNzc0NzQwYTcifQ.CNfaDbrJLPq14I30N1EqHg';
    var streets = L.tileLayer(mbUrl, {id: 'mapbox.streets', attribution: mbAttr}),
     satellite = L.tileLayer(mbUrl, {id: 'mapbox.streets-satellite', attribution: mbAttr}),
     grayscale = L.tileLayer(mbUrl, {id: 'pbellini.f33fdbb7', attribution: mbAttr});

    leafletUtil.baseMaps = {
     "Streets": streets,
     "Satellite": satellite,
     "Grayscale": grayscale
     };
    return leafletUtil.baseMaps;

};


leafletUtil.setToggleMap = function(){
    if( leafletUtil.IsNull(leafletUtil.baseMaps) || leafletUtil.IsEmptyObject(leafletUtil.baseMaps)){
        leafletUtil.setBaseMaps(); //Set up base maps
    }
    if(leafletUtil.IsNull(leafletUtil.baseMaps) || leafletUtil.IsEmptyObject(leafletUtil.baseMaps)){
        leafletUtil.toggleMap = L.control.layers(
            {position: 'bottomright', width: '50px', height: '50px'});
    }else if(leafletUtil.IsNull(leafletUtil.overlayMaps) || leafletUtil.IsEmptyObject(leafletUtil.overlayMaps)){
        leafletUtil.toggleMap = L.control.layers(leafletUtil.baseMaps,null,
            {position: 'bottomright', width: '50px', height: '50px'});
    }else{
        leafletUtil.toggleMap = L.control.layers(leafletUtil.baseMaps,leafletUtil.overlayMaps,
            {position: 'bottomright', width: '50px', height: '50px'});
    }
    return leafletUtil.toggleMap;
};

leafletUtil.setGroupedLayers = function(){
    if(leafletUtil.baseMaps && !leafletUtil.IsEmptyObject(leafletUtil.baseMaps)){
        map.removeLayer(leafletUtil.baseMaps);
    }
    if(!leafletUtil.baseMaps || leafletUtil.IsEmptyObject(leafletUtil.baseMaps)){
        leafletUtil.setBaseMaps(); //Set up base maps
    }
    if(!leafletUtil.baseMaps || leafletUtil.IsEmptyObject(leafletUtil.baseMaps)){
        leafletUtil.groupedLayers = L.control.groupedLayers();
    }else if(!leafletUtil.overlayMaps || leafletUtil.IsEmptyObject(leafletUtil.overlayMaps)){
        leafletUtil.groupedLayers = L.control.groupedLayers(leafletUtil.baseMaps);
    }else{
        leafletUtil.groupedLayers = L.control.groupedLayers(leafletUtil.baseMaps,leafletUtil.overlayMaps);
    }
    return leafletUtil.groupedLayers;
};

/*** Set the src of the javascript file*/
//var mySRC = jQuery('script[src$="resources/js_utility/leaflet_buildMap_support.js"]').attr('src').replace('js_utility/leaflet_buildMap_support.js', '');

//leafletUtil.initLeaflet = function() {
/*** On ready document  */
jQuery( document ).ready(function() {
    try {
        leafletUtil.setCtx(); //Set the request context path
        leafletUtil.initMap();
        leafletUtil.addPluginFileLayer();
        //leafletUtil.setBaseMaps(); //Set up base maps
        //leafletUtil.setToggleMap(); //loade from initMap()
        //leafletUtil.setGroupedLayers(); //Set the groupedLayers
        leafletUtil.setupIcons(categories.categories); //Set up icons
    }catch(e){
        console.error('Error on setting the parameters:'+e.message);
    }


    //OTHER METHOD TO COMMUNCIATE WITH JSP PAGE

    /** if you have add a new marker from spring put in the map. */
    if ((!jQuery.isEmptyObject(leafletUtil.arrayGeoDocuments)) && leafletUtil.arrayGeoDocuments.length > 0) {
        leafletUtil.addMultipleMarker(leafletUtil.arrayGeoDocuments);
    }

    //ABILITA LA RICRECA NEI MARKER CON IL PLUGIN LEAFLET-SEARCH
    jQuery('#textsearch').on('keyup', function (e) {
        leafletUtil.controlSearch.searchText(e.target.value);
    });


    jQuery("#getMarkers").click(function () {
        leafletUtil.getMarkers();
    });

    //Search address with google...
    //jQuery("div.leaflet-control-geosearch").appendTo(jQuery("#search-address-with-google"));
    //<div class="leaflet-control-search leaflet-control search-exp">
    jQuery("#searchMarkerWithJavascript").appendTo(jQuery("#searchMarkerWithJavascript2"));
    leafletUtil.addGeoCoderPluginWithContainer('#searchMarkerWithJavascript3');
    leafletUtil.addPluginFuseSearch('name',null,null);

    console.info("Loaded all JQUERY variable");

   });
//};

leafletUtil.layer_fileLayer = {};

leafletUtil.addPluginFileLayer = function() {
    try {
        L.Control.fileLayerLoad.LABEL = '<i class="fa fa-folder-open"></i>';
        L.Control.fileLayerLoad({
            fileSizeLimit: 6144,
            /*latitudeColumn: longitudeColumn,
             longitudeColumn: longitudeColumn,*/
            //validateGeoJson: false,
            layer: markerClusters,
            popupTable: true,
            layerOptions: {
                pointToLayer: function (feature, latlng) {
                    //WORK simple
                    //return new L.marker(latlng);
                    return new L.marker(latlng,{icon:leafletUtil.randomLeafletIconFromJsonArray()});
                },
                onEachFeature: function (feature, layer) {
                    try {
                        var popupContent = '';
                        if (feature.properties && feature.properties.popupContent) {
                            popupContent = feature.properties.popupContent;
                        }
                        layer.bindPopup(popupContent);
                    } catch (e) {
                        alert(e.message);
                    }
                }
            }
        }).addTo(map);
        leafletUtil.layer_fileLayer = L.Control.fileLayerLoad.options.layer;
    }catch(e){
        console.error(e.message);
    }
};

/**
 * Function to add the plugin geocoder to the Leaflet Map.
 * href: https://github.com/perliedman/leaflet-control-geocoder
 * @param containerId the id of the html container of the plugin.
 */
leafletUtil.addGeoCoderPluginWithContainer = function(containerId){
    if (leafletUtil.IsEmptyObject(containerId)) leafletUtil.geoCoderControl.containerSelectorId = "#searchMarkerWithJavascript3";
    else leafletUtil.geoCoderControl.containerSelectorId = containerId;
    try {
        addPluginGeoCoder(); //set the selector
        //Help css for PluginLeafletGeocoder
        //<a class="leaflet-control-geocoder-icon" href="javascript:void(0);">&nbsp;</a>
        jQuery("a").remove(jQuery(".leaflet-control-geocoder-icon"));
        //<div class="leaflet-control-geocoder leaflet-bar leaflet-control leaflet-control-geocoder-expanded">
        jQuery(".leaflet-control-geocoder").appendTo(jQuery(containerId));
        //implement select of the geocoder.
        for (var name in leafletUtil.geoCoderControl.geocoders) {
            if(leafletUtil.geoCoderControl.geocoders.hasOwnProperty(name)) {
                btn = L.DomUtil.create('button', 'leaflet-bar', leafletUtil.geoCoderControl.selector);
                btn.innerHTML = name;
                //L.DomUtil.addClass(btn,name);
                (function (n) {
                    L.DomEvent.addListener(btn, 'click', function () {
                        //select(leafletUtil.geoCoderControl.geocoders[n], this); //geocoder,el
                        if (leafletUtil.geoCoderControl.selection) {
                            try {
                                L.DomUtil.removeClass(leafletUtil.geoCoderControl.selection, 'selected');
                            } catch (e) {
                                console.warn("Warning::addGeoCoderPluginWithContainer ->" + e.message);
                            }
                        }
                        leafletUtil.geoCoderControl.geoCoderControl.options.geocoder = leafletUtil.geoCoderControl.geocoders[n];
                        L.DomUtil.addClass(this, 'selected');
                        leafletUtil.geoCoderControl.selection = this;
                        leafletUtil.geoCoderControl.geoCoderControl.markGeocode = function (result) {
                            console.info("add Geocoder marker from event click with geocoder [" + n + "]:"
                                + result.name + "," + result.center.lat + "," + result.center.lng);
                            var bounds = L.Bounds(
                                L.point(result.bbox.getSouthEast(), result.bbox.getNorthEast()),
                                L.point(result.bbox.getNorthWest(), result.bbox.getSouthWest())
                            );
                            var popupContent = leafletUtil.preparePopupTable(result);
                            var name = result.name.replaceAll(',',' ');
                            leafletUtil.addSingleMarker(name, '', result.center.lat, result.center.lng, bounds, popupContent);
                        };
                        //end of select
                    }, btn);
                })(name);
                if (!leafletUtil.geoCoderControl.selection){
                    //select(leafletUtil.geoCoderControl.geocoders[name], btn);
                    if (leafletUtil.geoCoderControl.selection){
                        L.DomUtil.removeClass(leafletUtil.geoCoderControl.selection, 'selected');
                    }
                    leafletUtil.geoCoderControl.geoCoderControl.options.geocoder = leafletUtil.geoCoderControl.geocoders[name];
                    L.DomUtil.addClass(btn, 'selected');
                    leafletUtil.geoCoderControl.selection = btn;
                }
            }//hasOwnProperty
            jQuery('#geocode-selector').append(btn);
        }// end of the for...
    }catch(e){
        console.error("Exception::addGeoCoderPluginWithContainer ->"+ e.message);
    }
};

/**
 * Function (very good for me) to convert a Object javascript to a html table, for make a pretty popup marker.
 * @param object the object javascript to convert to a html table.
 * @returns {string}
 */
leafletUtil.preparePopupTable = function(object){
    var popupContent2 = '<div class="popup-content">\n<table class="table table-striped table-bordered table-condensed">\n';
    try {
        //if is a json object
        if(leafletUtil.IsJson(object) == true) {
            var json = JSON.parse(JSON.stringify(object, 2));
            //console.warn("RESULT:" + JSON.stringify(json, 2));
            popupContent2 += leafletUtil.preparePopupColumn(json, '', '');
        }
        else if(!leafletUtil.IsNull(object) && leafletUtil.IsObject(object)){
            var titles = Object.keys(object).toString().split(",");
            for (var title, i = 0; title = titles[i++];) {
                try {
                    // is Array or Object
                    if (!leafletUtil.IsNull(object[title]) &&
                        (leafletUtil.IsArray(object[title])|| leafletUtil.IsObject(object[title])))continue;
                    //if (typeof leafletUtil.geoDocument[title] !== 'String' || leafletUtil.geoDocument[title] == 'popupContent') continue;
                    if (object[title].toString().indexOf('http') === 0) {
                        object[title] = '<a target="_blank" href="' + object[title] + '">'
                            + object[title] + '</a>';
                    }
                    popupContent2 += '<tr><th>' + title + '</th><td>' + object[title] + '</td></tr>';
                } catch (e) {
                    console.warn('Warning::preparePopupTable() ->' + e.message);
                }
            }//for
        }else{
            console.error(
                'preparePopupTable() -> Try to create a popuptable from a \'null\' object -> '+JSON.stringify(object));
        }
    }catch(e){
        console.error('Exception::preparePopupTable() ->'+ e.message);
    }
    popupContent2 += "</table>\n</div>\n";
    return popupContent2;
};
/**
 * Function to prepare the column value key of the HTMl Table used for  the popup.
 * @param data the JSON data to inspect.
 * @param popupContent the String of the PopupContent already set.
 * @param nameKey the String name key of the column to append to the popupContent.
 * @returns {*}
 */
leafletUtil.preparePopupColumn = function(data,popupContent,nameKey){
    for(var i = 0; i < Object.keys(data).length; i++){
        var json = data[Object.keys(data)[i]];
        if(typeof json != 'object' && !Array.isArray(json)){
            popupContent += leafletUtil.preparePopupRow(nameKey + "+" + Object.keys(data)[i], JSON.stringify(json,2));
        }else {
            for (var key in json) {
                if (json.hasOwnProperty(key)) {
                    try {
                        if (json[key] !== null) {
                            if (typeof json[key] == 'object') {
                                popupContent =
                                    leafletUtil.preparePopupColumn(
                                        json[key], popupContent, nameKey + "+" + Object.keys(data)[i] + "+" + key);
                            } else if (Array.isArray(json[key])) {
                                popupContent =
                                    leafletUtil.preparePopupColumn(
                                        json[key], popupContent, nameKey + "+" + Object.keys(data)[i] + "+" + key);
                            } else {
                                popupContent +=
                                    leafletUtil.preparePopupRow(
                                        nameKey + "+" + Object.keys(data)[i] + "+" + key, json[key]);
                            }
                        }
                    } catch (e) {
                        console.warn("Exception::preparePopupColumn() ->" + e.message);
                    }
                }//hasOwnProperty
            }//for
        }//else
    }//for
    return popupContent;
};

/**
 * Function to Set the Row of the HTMl Table used for  the popup.
 * @param key the String name of the key of the json attribute.
 * @param value the String name o f the value of the json attribute.
 * @returns {string}
 */
leafletUtil.preparePopupRow = function(key,value){
    try{
        key = key.indexOf('+') == 0 ? key.substring(1) : key;
        //need for clean the result send to the SpringFramework project
        value = value.toString().replaceAll(',', ' ');

        //check if is  url to a remote resource...
        if (value.toString().indexOf('http') === 0) {
            value = '<a target="_blank" href="' + value + '">'+ value + '</a>';
        }
        if(value.startsWith('\"') && value.endsWith('\"')){
            value = value.slice(1,value.length -1);
        }
        return '<tr><th>' + key + '</th><td>' + value + '</td></tr>';
    }catch(e){
        console.error('leafletUtil.preparePopupRow ->'+ e.message)
    }
};

/**
 * Function to check a specific object javascript is Empty Object.
 * NOTE: just a replace function fot the jQuery.isEmptyObject.
 * @param object the object javascript to check.
 * @returns {boolean}
 * @constructor
 */
leafletUtil.IsEmptyObject = function(object){ return leafletUtil.Is(object,'emptyobject');};
/**
 * Function to check a specific object javascript is a Json Object.
 * @param object the object javascript to check.
 * @returns {boolean}
 * @constructor
 */
leafletUtil.IsJson = function(object){ return leafletUtil.Is(object,'json');};
/**
 * Function to check a specific object javascript is a Json Array.
 * @param object the object javascript to check.
 * @returns {boolean}
 * @constructor
 */
leafletUtil.IsJsonArray =  function(object){ return leafletUtil.Is(object,'jsonarray');};
/**
 * Function to check a specific object javascript is null Object.
 * @param object the object javascript to check.
 * @returns {boolean}
 * @constructor
 */
leafletUtil.IsNull = function(object){ return leafletUtil.Is(object,'null');};
/**
 * Function to check a specific object javascript is undefined Object.
 * @param object the object javascript to check.
 * @returns {boolean}
 * @constructor
 */
leafletUtil.IsUndefined =  function(object){return leafletUtil.Is(object,'undefined');};
/**
 * Function to check a specific object javascript is a String.
 * @param object the object javascript to check.
 * @returns {boolean}
 * @constructor
 */
leafletUtil.IsString =  function(object){ return leafletUtil.Is(object,'string');};
/**
 * Function to check a specific object javascript is a Array.
 * @param object the object javascript to check.
 * @returns {boolean}
 * @constructor
 */
leafletUtil.IsArray =  function(object){return leafletUtil.Is(object,'array');};
/**
 * Function to check a specific object javascript is empty Object/String/Array/ecc..
 * @param object the object javascript to check.
 * @returns {boolean}
 * @constructor
 */
leafletUtil.IsEmpty =  function(object){return leafletUtil.Is(object,'empty');};
/**
 * Function to check a specific object javascript is a Object.
 * @param object the object javascript to check.
 * @returns {boolean}
 * @constructor
 */
leafletUtil.IsObject =  function(object){return leafletUtil.Is(object,'object');};
/**
 * Function to check a specific object javascript is something.
 * @param object the object javascript to check.
 * @param stringValue the String id for check a specific type of objects.
 * @returns {boolean}
 * @constructor
 */
leafletUtil.Is = function(object,stringValue){
    var result = false;
    try {
        if (stringValue)stringValue = stringValue.toString().toLowerCase();
        switch(stringValue){
            case 'json':{
                try {
                    JSON.parse(JSON.stringify(object));
                    result = true;
                } catch (e) { result = false;}
                if(!result){
                    var t = typeof object;
                    result = ['boolean', 'number', 'string', 'symbol', 'function'].indexOf(t) == -1;
                }
                break;
            }
            case 'jsonarray':{
                result = Object.prototype.toString.call(object) === '[object Array]';
                break;
            }
            case 'null':{
                result =  (object === null || object == null);
                break;
            }
            case 'undefined': {
                result =  (object === undefined);
                break;
            }
            case 'string': {
                result =  object.constructor === "test".constructor;
                break;
            }
            case 'array': {
                result =  (Array.isArray(object) || object.constructor === [].constructor);
                break;
            }
            case 'empty': {
                if(leafletUtil.IsString(object)){
                    result = (object.toString() == '')
                }else if(leafletUtil.IsArray(object)){
                    result =  !(typeof object != "undefined" && object != null && object.length > 0);
                }else if(leafletUtil.IsObject(object)){
                    result = (Object.keys(object).length == 0);
                }else{
                    result = (JSON.stringify(object)=='{}');
                }
                break;
            }
            case 'emptyobject':{
                function isEmpty(object) {
                    for(var key in object) {
                        if(object.hasOwnProperty(key)){
                            return false;
                        }
                    }
                    return true;
                }
                result = isEmpty(object);
                break;
            }
            case 'object': {
                result =  (object.constructor === {}.constructor || typeof object === 'object');
                break;
            }
            default: result =  false;
        }
        //console.info('Try Is with '+stringValue+ ' -> ' +result);
    }catch(e){
        console.error('Exception::leafletUtil.Is -> Try Is with '+stringValue+ ' -> ' +result +'-> '+e.message);
    }
    return result;
};



/**
 * function to get the information on the marker ont he Layer to a Array to pass
 * by create a list of input to pass to a specific form.
 */
leafletUtil.inspectMarkerOnLayer = function(myLayerGroup){
    var array = [];
    console.log("compile getMarkers");
    try{
        myLayerGroup.eachLayer(function (layer) {
            leafletUtil.inspectMarkerOnMarker(array,layer);
        });

    }catch(e){console.error("Exception:getMarkers -> "+e.message);}
    console.info("...compiled getMarkers");
    return array;
};
leafletUtil.inspectMarkerOnMarker = function(array,layer){
    try {
        var label = '';
        var url = '';
        var lat = '';
        var lng = '';
        var popupContent = '';
        var category = '';
        var id = '';
        lat = layer.getLatLng().lat;
        lng = layer.getLatLng().lng;
        //label = layer.getLabel()._content;
        if(lat!=0 && lng !=0) {
            try {
                label = layer.label._content; //get name with Leaflet.Label
            }catch(e){
                try {
                    label = layer.feature.properties.title;
                    if (!label) label = layer.feature.properties.name;
                }catch(e){}
            }
            try {
                if (!url) url = layer.feature.properties.url;
            }catch(e){}
            //"http://localhost:8181/resources/img/mapicons/ShoppingAndService_Pharmacy.png"
            category = leafletUtil.getFileNameNoExtensionFromURL(layer.options.icon.options.iconUrl);
            popupContent = layer.getPopup().getContent();
            id = layer._leaflet_id;
            console.info("marker number():" + lat + "," + lng + "," + label);
            array.push({name:label,url:url,latitude:lat,longitude:lng,popupContent:popupContent,category:category,id:id});
            //array.push({name: label, latitude: lat, longitude: lng, popupContent: popupContent});
        }
        //i++;
    }catch(e){
        console.error("Exception:getMarkers -> "+e.message);
    }
    return array;
};

leafletUtil.getFileNameNoExtensionFromURL= function(url){
    // var url = layer.options.icon.options.iconUrl;
    url = url.substring(url.lastIndexOf('/')+1);
    if (url){
        //var m = url.toString().match(/.*\/(.+?)\./);
        //if (m && m.length > 1)return m[1];
        var m = url.split(".");
        if (m && m.length > 1)return m[0];
    }
    return '';
};

leafletUtil.addNewInput = function(input_id,input_name,input_val,input_type,containerId,index) {
    var input = document.createElement('input');
    if(leafletUtil.IsNull(index)){
        input.setAttribute('id', input_id+index);
    }else {
        input.setAttribute('id', input_id);
    }
    input.setAttribute('name', input_name); //same name for all input so Spring get all like a String
    input.setAttribute('type', input_type);
    input.setAttribute('value', input_val);
    //document.body.appendChild(input);
    document.getElementById(containerId).appendChild(input);
    //setInputValue(input_id,val);
};

leafletUtil.addNewArrayOfInputs = function(array,containerId,nameElementOrIndex){
    for (var i = 0; i < array.length; i++) {
        var content = JSON.stringify(array[i]);
        try {
            if(leafletUtil.IsNull(nameElementOrIndex)) {
                leafletUtil.addNewInput('array' + i, 'array', content, containerId, i);
            }else{
                leafletUtil.addNewInput('array' + i, nameElementOrIndex, content,'hidden', containerId, i);
            }
        }catch(e){console.error('addNewArrayOfInputs:: Can\'t create the new Input'+e.message);}
    }
};


/***
 *  Set the map and zoom on the specific location
 */
leafletUtil.initMap = function(){
    if(!map || leafletUtil.IsEmptyObject(map)) {
        console.log("Init Map...");
        try {
            if (leafletUtil.IsEmptyObject(markerClusters))markerClusters = new L.MarkerClusterGroup();
            //Make all popup remain open.
            L.Map = L.Map.extend({
                openPopup: function(popup) {
                    //this.closePopup();  // just comment this
                    this._popup = popup;
                    return this.addLayer(popup).fire('popupopen', {
                        popup: this._popup
                    });
                }
            });

            var streets = leafletUtil.baseMaps['Streets'],
                satellite = leafletUtil.baseMaps['Satellite'],
                grayscale = leafletUtil.baseMaps['Grayscale'];

            map = L.map('map', {
                center: [43.3555664, 11.0290384],
                zoom: 8,
                layers: [satellite]
            });

            //Create and add a toggle map
            //leafletUtil.setToggleMap();

            if (getUrlParameter("map") == "streets") {
                map.removeLayer(satellite);
                map.addLayer(streets);
            }
            else if (getUrlParameter("map") == "grayscale") {
                map.removeLayer(satellite);
                map.addLayer(grayscale);
            }

            // DEFINIZIONE DEI CONFINI MASSIMI DELLA MAPPA
            //Set a bound window for the leaflet map for Toscany region
            var bounds = new L.LatLngBounds(new L.LatLng(41.7, 8.4), new L.LatLng(44.930222, 13.4));
            //var bounds = new L.LatLngBounds(new L.LatLng(setBounds[0],setBounds[1]), new L.LatLng(setBounds[2], setBounds[3]));
            map.setMaxBounds(bounds);

            //map.attributionControl.setPrefix(''); // Don't show the 'Powered by Leaflet' text.

            //..add other functionality
            //map.on('click', onMapClick);
            //Fired when the view of the map stops changing
            map.on('moveend', onMapMove);
            /*map.on('viewreset', function() { resetShapes(); //resetStops();});*/
            //other function form Service Map
            console.log("MAP IS SETTED");
            //$('#caricamento').delay(500).fadeOut('slow');

            // Information pane need a div with id='infopane'
            //L.control.infoPane('infopane', {position: 'bottomright'}).addTo(map);
        } catch (e) {
           console.error('Exception::initMap() -> ' + e.message);
        }
    }
    //finally
    if(leafletUtil.IsEmptyObject(leafletUtil.toggleMap)){
        leafletUtil.setToggleMap();
        leafletUtil.toggleMap.addTo(map);
    }


};




leafletUtil.addSingleMarker = function(name,lat,lng,bounds,popupContent) {
    leafletUtil.addSingleMarker(name,null,lat,lng,bounds,popupContent)
};
leafletUtil.addSingleMarker = function(name,lat,lng,popupContent) {
    leafletUtil.addSingleMarker(name,null,lat,lng,null,popupContent)
};

/**
 * Function for add a marker to the leaflet map
 * href: https://groups.google.com/forum/#!topic/leaflet-js/_oInGLe9uOY
 * href: http://gis.stackexchange.com/questions/113076/custom-marker-icon-based-on-attribute-data-in-leaflet-geojson
 */
leafletUtil.addSingleMarker = function(name, url, lat, lng, bounds, popupContent) {
    var text;
    if(!$.isEmptyObject(url) && url.toString().indexOf('http') === 0) text = '<a class="linkToMarkerInfo" href="' + url + '" target="_blank">' + name + '</a>';
    else  text = name;
    var marker = {name:text,url:url,latitude:lat,longitude:lng,popupContent:popupContent,id:'',category:''};
    if(leafletUtil.IsEmptyObject(map)) {leafletUtil.initMap();}
    console.info("... add single marker:" + name + ',' + url + ',' + lat + ',' + lng + ',' + popupContent);
    try {
        if (leafletUtil.IsEmptyObject(markerClusters))markerClusters = new L.MarkerClusterGroup();
        if(bounds) map.setBounds(bounds);

        //CREATE A L.Marker
        /*marker = new L.marker([parseFloat(lat), parseFloat(lng)], {draggable:false}, { icon: deathIcon},{title: name} )
         .bindLabel(text, { noHide: true }).addTo(map);
         */
        /*  markerVar = new L.Marker(new L.latLng(loc), {title: name, icon: new L.Icon.Default()} )
         .bindLabel(text, { noHide: true });//se property searched*/
        //WORK
       /* markerVar = new customMarkerVar(new L.latLng(loc), {title: name, icon: new L.Icon.Default()} )
            .bindLabel(text, { noHide: true });//se property searched*/

        //..set some action for the marker
        //evt.target is the marker where set the action
        //markerVar.on('click', function (e) { e.target.bindPopup(popupOver).openPopup();});
        //marker.on('mouseover', function (e) {e.target.bindPopup(popupOver).openPopup();});
        //marker.on('mouseout', function (e) { e.target.closePopup();});
        //marker.on('dblclick',function (e) { map.removeLayer(e.target)});
        /*marker.on('click', onMarkerClick(), this);*/

        //..add marker to the array of cluster marker

        //Add property dinamically [WORK] but inefficient.....
        //var geoJsonWithProperties = leafletUtil.loadPropertiesToGeoJson(markerVar,{name:name});

        var geoJsonWithProperties = leafletUtil.createGeoJsonFeatureCollection(marker);

        //CREATE a GeoJson with properties....
        var layerGeoJson = L.geoJson(geoJsonWithProperties, {
            style: function (feature) {
                return feature.properties.style;
            },
            // add a popup content to the marker
            onEachFeature: function (feature, layer) {
                var popupOver =
                    new L.popup({maxWidth:100,minWidth:50,maxHeight:200}).setContent(feature.properties.popupContent);
                layer.bindPopup(popupOver);
                layer.on('click', function (e) { e.target.bindPopup(popupOver).openPopup();});
            },
            pointToLayer: function (feature, latlng) {
                //L.CircleMarker
                var markerVar = new L.Marker(latlng, {title: name, icon: new L.Icon.Default()} )
                    .bindLabel(text, { noHide: true });//se property searched
                feature.properties.id = L.Util.stamp(markerVar);
                return markerVar;
            }
            // correctly map the geojson coordinates on the image
            /*coordsToLatLng: function(coords) {
             return rc.unproject(coords);
             },*/
        });
        //Add FuseSearch Plugin, NOTE: the plugin is add onReady Document, this is the function to invoke on the layer..
        if(leafletUtil.fuseSearchCtrl) {
            //USE the plugin FuseSearch for dinamically research fo the amrkers..
            var arrayPropToShowOnResearch =  ['name'];
            leafletUtil.invokePluginFuseSearch(layerGeoJson.toGeoJSON(), arrayPropToShowOnResearch);
            //markerClusters.addLayer(layer); already added.....
            leafletUtil.setToggleMap(); //add new element ot the toogleMap...
        }else{
            markerClusters.addLayer(layerGeoJson);
        }
        //Add Marker to the layerGroup
        //markerClusters.addLayer(markerVar);
        //...set to a Global variable for use with different javascript function
        //map.addLayer(markerClusters);
        markerClusters.addTo(map);
        //set the view...
        map.setView([lat, lng], 8);
    }catch(e) {
        console.error("Exception::addSingleMarker() -> "+e.message +" ,Sorry the program can't create the Marker");
    }
    console.info('Content Layer:'+JSON.stringify(markerClusters.toGeoJSON()));

    //add object marker th the external cache.....
    leafletUtil.markerList.push(marker);
    console.info("...Compiled addSingleMarker()");
};

leafletUtil.loadAllLayerOnTheMapAndConvertToMarker = function(idForm,nameElementOrIndex){
    //var array =[];
    //TEST 1
    /*map.eachLayer(function (layer) {
        array = leafletUtil.inspectMarkerOnLayer(layer);
        leafletUtil.markerList.push.apply(leafletUtil.markerList, array);
    });*/
    //TEST 2
    /*array = leafletUtil.inspectMarkerOnLayer(map);
    leafletUtil.markerList.push.apply(leafletUtil.markerList, array);*/
    //TEST 3
    getAllMarkers();
    leafletUtil.loadArrayOnInput3(leafletUtil.markerList,idForm,nameElementOrIndex);
};


// getting all the markers at once
function getAllMarkers() {
    var array = [];
    var allMarkersObjArray = [];//new Array();
    var allMarkersGeoJsonArray = [];//new Array();
    jQuery.each(map._layers, function (ml) {
        //console.log(map._layers)
        if (map._layers[ml].feature) {
            allMarkersObjArray.push(this)
            allMarkersGeoJsonArray.push(JSON.stringify(this.toGeoJSON()))
        }
    });
    console.log(allMarkersObjArray.length);
    console.log("total Markers : " + allMarkersGeoJsonArray.length );
        //+ "\n\n" + allMarkersGeoJsonArray + "\n\n Also see your console for object view of this array");
    for (var i = 0; i < allMarkersObjArray.length; i++) {
        //array = leafletUtil.inspectMarkerOnLayer(allMarkersObjArray[i]);
        leafletUtil.inspectMarkerOnMarker(array,allMarkersObjArray[i]);
        leafletUtil.markerList.push(array[0]);
    }
    console.log(leafletUtil.markerList.length);
    return leafletUtil.markerList;
}


/**
 * Function for create a [lng, lat] json Array and a L.LatLng to put on external Array.
 * @param lat the String value of the latitude coordinates.
 * @param lng the String value of the longitude coordinates.
 * @returns {*[]}
 */
leafletUtil.createGeoJsonLatLng = function(lat,lng){
    try {
        //Very slow check but you are sure not get wrong coordinates....
        if (/[a-z]/.test(lng.toString().toLowerCase()) ||
            /[a-z]/.test(lat.toString().toLowerCase()) ||
            isNaN(lng) || isNaN(lat) || !isFinite(lng) || !isFinite(lat)) {
            console.error("Coords lnglat:[" + lng + "," + lat + "] ,id:" + id);
            return [NaN, NaN];
        }else{
            if (!(lng < 180 && lng > -180 && lat < 90 && lat > -90)) {
                console.warn("Something wrong with the coordinates, ignore line", id, " invalid data");
                return [NaN, NaN];
            }
        }
        leafletUtil.arrayLatLng.push(new L.LatLng(lat,lng));
        return [lng, lat];
    } catch (e) {
        //try with the string
        console.warn('Exception::leafletUtil.createGeoJsonLatLng ->'+e.message);
    }
};

leafletUtil.createBounds = function(arrayLatLng){
    return new L.LatLngBounds(arrayLatLng);
    // map.fitBounds(newBounds);
};

leafletUtil.removeLayer = function(layerToRemove){
    map.removeLayer(layerToRemove);
    layerToRemove.removeFrom(map);
    if(map.hasLayer( leafletUtil.toggleMap)) map.removeLayer(layerToRemove);
};

leafletUtil.getLatitudeField = function(jsonData){return leafletUtil.getField(jsonData,'lat');};
leafletUtil.getLongitudeField = function(jsonData){return leafletUtil.getField(jsonData,'lng');};
leafletUtil.getIdField = function(jsonData){return leafletUtil.getField(jsonData,'id');};
leafletUtil.getField = function(jsonData,stringNameFieldToSearch){
    if(!leafletUtil.IsJsonArray(jsonData)) jsonData = leafletUtil.toJsonArray(jsonData);
    var titles = Object.keys(jsonData[0]);
    for (var f,i=0; f = titles[i++];) {
        if (stringNameFieldToSearch == 'lat' && leafletUtil.IsLat(f)) return f;
        if (stringNameFieldToSearch == 'lng' && leafletUtil.IsLon(f)) return f;
        if (stringNameFieldToSearch == 'id' && leafletUtil.IsId(f)) return f;
    }
};

/**
 * Function to convert a json object to a json Array.
 * @param jsonData the json object or Array.
 * @returns {*}
 */
leafletUtil.toJsonArray = function(jsonData){
    if(!leafletUtil.IsJsonArray(jsonData)){
        var markers  = jsonData;
        jsonData = [];
        jsonData.push(markers);
    }
    return jsonData;
};

/**
 * Function for check if the field is the latitude field.
 * @param field the name of the field to inspect.
 * @returns {boolean}
 * @constructor
 */
leafletUtil.IsLat = function(field) { return !!field.match(/(L|l)(at)(itude)?/gi); };
/**
 * Function for check if the field is the longitude field.
 * @param field the name of the field to inspect.
 * @returns {boolean}
 * @constructor
 */
leafletUtil.IsLon = function(field) { return !!field.match(/(L|l)(on|ng)(gitude)?/i); };
/**
 * Function for check if the field is the longitude field.
 * @param field the name of the field to inspect.
 * @returns {boolean}
 * @constructor
 */
leafletUtil.IsLng = function(field) { return leafletUtil.IsLon(field) };
/**
 * Function for check if the field is the id field.
 * @param field the name of the field to inspect.
 * @returns {boolean}
 * @constructor
 */
leafletUtil.IsId = function(field) { return !!field.match(/([m|M]arker)?(id|Id)/i); };

leafletUtil.createGeoJsonFeatureCollection = function(jsonData){
    if(!leafletUtil.IsJsonArray(jsonData)) jsonData = leafletUtil.toJsonArray(jsonData);
    var titles = Object.keys(jsonData[0]);
    var latField,lngField,markerId;
    for (var f,i=0; f = titles[i++];) {
        if (leafletUtil.IsLat(f)) latField = f;
        if (leafletUtil.IsLon(f)) lngField = f;
        if (leafletUtil.IsId(f)) markerId = f;
    }
    return leafletUtil.createGeoJsonFeatureCollections(jsonData,latField,lngField,markerId)
};

/**
 * Method to create a geoJson data from a json, for LeafletMap.
 * @param jsonData the json data to convert to a geoJson data.
 * @param latField the field/attribute name of the latitude.
 * @param lngField the field/attribute name of the longitude.
 * @param markerId the field/attribute name of the markerId
 *       (just a id for retrieve the single information).
 * @returns {{type: string, features: Array}}
 */
leafletUtil.createGeoJsonFeatureCollections = function(jsonData,latField,lngField,markerId){
    try {
        jsonData = leafletUtil.toJsonArray(jsonData);
       /* if(!leafletUtil.IsJsonArray(jsonData)){
            var markers  = jsonData;
            jsonData = [];
            jsonData.push(markers);
        }*/
        //Input: {lat:'',lng:'',popupContent:'',name:'',markerId:''}
        var json = {
            type: "FeatureCollection",
            features: Object.keys(jsonData).map(function (id) {
                //id 0,1,2,3,4,5,.....
                var obj = jsonData[id]; //json object to analyze....
                //make sure is a json object
                if(!leafletUtil.IsJson(obj)) console.error('Can\'t create a correct geoJson data with this object:'+obj);
                //make sure you not work with a array single collection
                if(leafletUtil.IsJsonArray()) obj = obj[0];
                //TODO for now in developer test i get a random value
                var icon = leafletUtil.icons.icons[Math.floor(Math.random() * leafletUtil.icons.icons.length)];
                if (obj === null || typeof obj === 'undefined') {
                    console.warn("Ignore line "+ obj[markerId]+ " invalid data");
                } else {
                    //var titles = Object.keys(obj);
                    return {
                        type: 'Feature',
                        properties: {
                            id: obj[markerId] ? obj[markerId] : id,
                            //integration for search
                            title: (function () {
                                if(obj.hasOwnProperty('title')) return obj.title;
                                return obj[markerId] ? obj[markerId] : id;
                            })(),
                            name: (function () {
                                if(obj.hasOwnProperty('name')) return obj.name;
                                return obj[markerId] ? obj[markerId] : id;
                            })(),
                            url: (function () {
                                if(obj.hasOwnProperty('url')) return obj.url;
                                return obj[markerId] ? obj[markerId] : id;
                            })(),
                            popupContent: (function () {
                                if (obj.popupContent) return obj.popupContent;
                                else return leafletUtil.preparePopupTable(obj);
                            })(),
                            //Added category information and icon from the icon object
                            //e.g. {name: name, icon: icon, iconUrl: url,categoryId:eleCat,
                            //category:value,categoryName:element.name,subCategoryOf:subCategory}
                            //category: icon.category,categoryId: icon.categoryId,categoryName: icon.categoryName,
                            //subCategoryOf: icon.subCategoryOf
                            category: icon.category,
                            categoryId: icon.categoryId,
                            categoryName: icon.categoryName,
                            subCategoryOf: icon.subCategoryOf
                        },
                        geometry: {
                            type: "Point",
                            coordinates: (function () {
                                //check now only the feature with correct coordinate
                                return leafletUtil.createGeoJsonLatLng(obj[latField], obj[lngField]);
                            })()
                        }
                    };
                }//if obj is not null
            })
        };
    }catch(e){
        console.error('Exception::leafletUtil.createGeoJsonFeatureCollections ->'+e.message);
    }
    return json;
};

/**
 *  Function for remove all cluster marker on the leaflet map
 */
leafletUtil.removeClusterMarker = function(){
    console.log("compile removeClusterMarker...");
    if(leafletUtil.arrayGeoDocuments.length > 0) {
        for (var i = 0; i < leafletUtil.arrayGeoDocuments.length; i++) {
            map.removeLayer(leafletUtil.arrayGeoDocuments[i]);//...remove every single marker
        }
        leafletUtil.arrayGeoDocuments.length = 0; //...reset array
    }
    markerClusters.eachLayer(function (layer) {
        layer.closePopup();
        map.removeLayer(layer);
    });
    map.closePopup();
    map.removeLayer(markerClusters);//....remove layer
    //points.clearLayers();
    console.log("...compiled removeClusterMarker");
};


/**
 * Function to add for every single object marker a Leaflet Marker on the Leaflet Map.
 * @param markers the Array collection of Marker object to add to the leafletMap
 *                e.g. {"name":name,"url":url,"lat":lat,"lng":lng,"popupContent":popupContent}
 */
leafletUtil.addMultipleMarker = function(markers){
    try {
        for (var j = 0; j < markers.length; j++){
            try {
                leafletUtil.addSingleMarker(markers[j].name, markers[j].url, markers[j].lat, markers[j].lng, null,
                    markers[j].popupContent);
            }catch(e){
                console.warn(e.message);
            }
        }
    }catch(e){
        console.error('Exception::leafletUtil.addMultipleMarker ->'+e.message);
    }
};

/**
 * Function to create a GeoDocument object for the javascript.
 */
leafletUtil.pushMarkerToArrayMarker = function(nameVar,urlVar,latVar,lngVar,regionVar,provinceVar,cityVar,addressVar,
                                     phoneVar,emailVar,faxVar,ivaVar,popupContentVar){
        try {
            leafletUtil.geoDocument = {};
            leafletUtil.geoDocument.name = nameVar;
            leafletUtil.geoDocument.url = urlVar;
            leafletUtil.geoDocument.lat = latVar;
            leafletUtil.geoDocument.lng = lngVar;
            leafletUtil.geoDocument.region = regionVar;
            leafletUtil.geoDocument.province = provinceVar;
            leafletUtil.geoDocument.city = cityVar;
            leafletUtil.geoDocument.address = addressVar;
            leafletUtil.geoDocument.phone = phoneVar;
            leafletUtil.geoDocument.email = emailVar;
            leafletUtil.geoDocument.fax = faxVar;
            leafletUtil.geoDocument.iva = ivaVar;
            leafletUtil.geoDocument.popupContent = popupContentVar;

            if(leafletUtil.IsNull(leafletUtil.geoDocument.popupContent)) {
                leafletUtil.geoDocument.popupContent = leafletUtil.preparePopupTable(leafletUtil.geoDocument);
            }
          /*  console.info("... prepare marker (" + specialj + "):"
                + leafletUtil.geoDocument.name + ',' + leafletUtil.geoDocument.url +
                ',' + leafletUtil.geoDocument.lat + ',' + leafletUtil.geoDocument.lng + "," + leafletUtil.geoDocument.popupContent);*/
            console.info("... prepare marker:"
                + leafletUtil.geoDocument.name + ',' + leafletUtil.geoDocument.url +
                ',' + leafletUtil.geoDocument.lat + ',' + leafletUtil.geoDocument.lng + "," + leafletUtil.geoDocument.popupContent);
            leafletUtil.arrayGeoDocuments.push(leafletUtil.geoDocument);
            console.log("....pushed a marker to the array on javascript side:" + leafletUtil.geoDocument.toString());
        }catch(e){
            console.error("Exception::pushMarkerToArrayMarker ->" +  e.message);
        }
    };

/**
 * Function to Add the Leaflet Plugin Search.
 * href: https://github.com/p4535992/leaflet-search.
 */
var geocoderSearchGoogle;
leafletUtil.addPluginSearch= function(){
    if(jQuery.isEmptyObject(map)) {leafletUtil.initMap();}
    /*try{
     geocoderSearchGoogle = new google.maps.Geocoder();
     }catch(e){
     console.warn("Warning:addPluginSearch->"+e.message);
     geocoderSearchGoogle = null;
     }*/
    try {
        if (!jQuery.isEmptyObject(markerClusters)) {
            /* controlSearch = new L.Control.Search({layer: markerClusters, initial: false,collapsed: false});*/
            if (jQuery.isEmptyObject(geocoderSearchGoogle)) {
                leafletUtil.controlSearch = new L.Control.Search({
                    container: "searchMarkerWithJavascript", layer: markerClusters, initial: false, collapsed: false
                });
            } else {
                leafletUtil.controlSearch = new L.Control.Search({
                    container: "searchMarkerWithJavascript",
                    layer: markerClusters,initial: false,collapsed: false,
                    sourceData: googleGeocoding,formatData: formatJSON,
                    markerLocation: true,autoType: false,autoCollapse: true, minLength: 2,zoom: 10
                });
            }
            map.addControl(leafletUtil.controlSearch);
        }
        console.log("...compiled addPluginSearch");
    }catch(e){
        console.error("Exception:addPluginSearch->"+e.message);
    }
};

/**
 * Function to Add the Leaflet plugin leaflet-control-geocoder.
 * href: https://github.com/perliedman/leaflet-control-geocoder
 */
function addPluginGeoCoder() {
    if(jQuery.isEmptyObject(map)) {leafletUtil.initMap();}
    console.info("Compile addPluginGeoCoder...");
    try {
        if (jQuery.isEmptyObject(leafletUtil.geoCoderControl.geoCoderControl)) {
            leafletUtil.geoCoderControl.selector = L.DomUtil.get('geocode-selector');
            leafletUtil.geoCoderControl.geoCoderControl = new L.Control.Geocoder({ geocoder: null },{collapsed: false});
            leafletUtil.geoCoderControl.geoCoderControl.addTo(map);
        } else {
            map.addControl(leafletUtil.geoCoderControl.geoCoderControl);
        }
        //TODO try to set a geocoder on the startup
        /*leafletUtil.geoCoderControl.geoCoderControl.markGeocode = function(result) {
            alert("add Geocoder marker:" + result.name + "," + result.center.lat + "," + result.center.lng +
                "," + result.bbox.toString()+","+result.html);
            var bounds = L.Bounds(
                L.point( result.bbox.getSouthEast(),result.bbox.getNorthEast() ),
                L.point( result.bbox.getNorthWest(),result.bbox.getSouthWest())
            );
            addSingleMarker(result.name,result.name,result.center.lat,result.center.lng,bounds,'');
        };*/
        console.info("...compiled addPluginGeoCoder");
    }catch(e){
        console.error("Exception:addPluginGeoCoder->"+e.message);
    }
}

/**
 * Function to load a Array object like json String object to the value of a input.
 * href: http://www.javascript-coder.com/javascript-form/javascript-form-value.phtml
 * @param arrayOfObject the Array collection to set like value of a input.
 * @param idForm the String id of the Form where set the value on the input.
 * @param nameElementOrIndex the String name of the element or the index number of the input to set.
 * @returns {*}
 */
leafletUtil.loadArrayOnInput3 = function(arrayOfObject,idForm,nameElementOrIndex){
    //load a array of object....
    if(leafletUtil.IsJsonArray(arrayOfObject)) {
        leafletUtil.addNewArrayOfInputs(arrayOfObject, idForm, nameElementOrIndex);
    }
    else {//load a unique json object...
        document.forms[idForm].elements[nameElementOrIndex].value = JSON.stringify(arrayOfObject);
    }
};

leafletUtil.loadArrayOnInput2 = function(idForm,nameElementOrIndex){
    return leafletUtil.loadArrayOnInput3(leafletUtil.markerList,idForm,nameElementOrIndex)
};

leafletUtil.loadArrayOnInputFromMap = function(idForm,nameElementOrIndex){
    leafletUtil.markerList = [];
    leafletUtil.loadAllLayerOnTheMapAndConvertToMarker();
    return leafletUtil.loadArrayOnInput3(leafletUtil.markerList,idForm,nameElementOrIndex)
};

/**
 * Function to invoke a the plugin leaflet.Fusearch of Leaflet on a specofoc geoJson data with
 * specific array of properties to search.
 * @param geoJsonData the GeoJson data to applied to FuseSearch.
 * @param propsArray the Array of tags to Search on the GeoJson data.
 */
leafletUtil.invokePluginFuseSearch = function(geoJsonData,propsArray){
    //Get all the icons already setted....
    var iconsJsonArray = leafletUtil.icons;
    try {
        //WORK
        //var layerCtrl = L.control.layers();
        leafletUtil.removeLayer(leafletUtil.toggleMap);
        leafletUtil.toggleMap = leafletUtil.setToggleMap();
        //NEW METHOD TRY TO USE WORK GROUP LAYER
        //leafletUtil.setGroupedLayers();
        //for each properties feature in the geojson...
        for (var feat,i=0; feat = geoJsonData.features[i++];) {
            if(feat.hasOwnProperty('properties') && feat.properties.hasOwnProperty('categoryName')) {
                var layer = new L.featureGroup();
                //populate the overlayMaps object
                leafletUtil.overlayMaps[feat.properties.categoryName] = layer;
                if(!markerClusters.hasLayer(layer)){
                    markerClusters.addLayer(layer);
                }
                //get the icon element with the same category of the feature  properties of the geojson....
                var elIcon = leafletUtil.searchJsonByKeyAndValue(iconsJsonArray.icons,'name',feat.properties.categoryName);
                //if elIcon is 'undefined' set a random category
                if(leafletUtil.IsUndefined(elIcon)){
                    console.warn('For build the toogle button is get a random value');
                    //TODO for now in developer test i get a random value
                    elIcon = iconsJsonArray.icons[Math.floor(Math.random() * iconsJsonArray.icons.length)];
                    if(!markerClusters.hasLayer(layer)){
                        markerClusters.addLayer(layer);
                    }
                }
                console.warn('44:'+JSON.stringify(elIcon));
                var iconMarkerUrl;
                //Set url of the icon
                if(elIcon.iconUrl == null) iconMarkerUrl = leafletUtil.ctx + '/resources/js/leaflet/images/marker-icon.png';
                else iconMarkerUrl = elIcon.iconUrl;
                var category = elIcon.name;
                var desc = '<img class="layer-control-img" src="'+ iconMarkerUrl +'" height=24>' + category;
                console.warn('45:'+JSON.stringify(desc));
                //WORK
                //layerCtrl.addOverlay(layer, desc);
                leafletUtil.toggleMap.addOverlay(layer, desc);
                //TRY NEW METHOD
                //leafletUtil.groupedLayers.addOverlay(layer,desc);
            }else{
                console.warn('the geojson not have a correct structure for the leafletUtil.invokePluginFuseSearch method');
            }
        }
        //WORK
        //layerCtrl.addTo(map);
        leafletUtil.toggleMap.addTo(map);
        //TRY NEW METHOD
        //leafletUtil.groupedLayers.addTo(map);
        //Feature,layers,icons
        leafletUtil.displayFeatures(geoJsonData.features,leafletUtil.overlayMaps,iconsJsonArray.icons);
        //var props = ['nom_comple', 'libcategor', 'commune'];
        leafletUtil.fuseSearchCtrl.indexFeatures(geoJsonData, propsArray);
    }catch(e){
        console.error('invokePluginFuseSearch:: ->'+e.message);
    }
};

/**
 * Function to Add the Leaflet plugin.
 * href: https://github.com/naomap/leaflet-fusesearch.
 * @param stringNameToSearch the String Name to Search.
 * @param stringTypeToSearch the String type to Search.
 * @param stringCategoryToSearch the String category to Search.
 */
leafletUtil.addPluginFuseSearch = function(stringNameToSearch,stringTypeToSearch,stringCategoryToSearch){
    try {
        // Add fuse search control
        var options = {
            position: 'topright',
            title: 'Search Marker',
            placeholder: 'put the name of the marker',
            maxResultLength: 15,
            threshold: 0.5,
            showInvisibleFeatures: true,
            showResultFct: function (feature, container) {
                var props = feature.properties;
             /*   var name = L.DomUtil.create('b', 'result_item', container);
                name.innerHTML = props[stringNameToSearch];
                container.appendChild(L.DomUtil.create('br', 'result_item'));*/

                var name = L.DomUtil.create('b', null, container);
                name.innerHTML = props[stringNameToSearch];
                container.appendChild(L.DomUtil.create('br', null, container));


                //Add some supplement listener
              /*  L.DomEvent.addListener(name, 'click', function () {
                        alert('set view to the marker');
                        var json = leafletUtil.searchJsonByKeyAndValue(leafletUtil.markerList[0],'name',name);
                        var latField = leafletUtil.getLatitudeField(json);
                        var lngField = leafletUtil.getLongitudeField(json);
                        map.setView([json[latField], json[lngField]]);
                    }
                );*/
                var info;
                if(leafletUtil.IsNull(stringTypeToSearch) || leafletUtil.IsNull(stringCategoryToSearch)) {
                    var cat = props[stringTypeToSearch] ? props[stringTypeToSearch] : props[stringCategoryToSearch];
                    info = '' + cat + ', ' + props[stringNameToSearch];
                }else{
                    info = props[stringNameToSearch];
                }
                container.appendChild(document.createTextNode(info));
            }
        };
        try {
            leafletUtil.fuseSearchCtrl = L.control.fuseSearch(options);
            map.addControl(leafletUtil.fuseSearchCtrl);
        }catch(e){
            console.error('addPluginFuseSearch::L.control.fuseSearch ->'+e.message);
        }
        //layerCtrl.addTo(map);
    }catch(e){
        console.error('addPluginFuseSearch ->'+e.message);
    }
};

/**
 * Function to get the json element of a json array from a key/value parameter.
 * @param jsonData the Json data where invoke the search.
 * @param key the key of the parameter to search.
 * @return the json data with the specific key/value parameter.
 */
leafletUtil.searchJsonByKeyAndValue = function(jsonData,key){
    return leafletUtil.searchJsonByKeyAndValue(jsonData,key,null);
};

/**
 * Function to get the json element of a json array from a key/value parameter.
 * @param jsonData the Json data where invoke the search.
 * @param key the key of the parameter to search.
 * @param value the value of the parameter to search.
 * @return the json data with the specific key/value parameter.
 */
leafletUtil.searchJsonByKeyAndValue = function(jsonData,key,value){
    if(!leafletUtil.IsJsonArray(jsonData)) jsonData = leafletUtil.toJsonArray(jsonData);
    for (var i = 0; i < jsonData.length; i++) {
        try {
            if (jsonData[i].hasOwnProperty(key)) {
                if(value) {
                    if (jsonData[i][key] == value)return jsonData[i];
                }else{
                    return jsonData[i];
                }
            }
        }catch(e){
            console.error('Exception::leafletUtil.searchJsonByKeyAndValue ->'+ e.message);
        }
    }
};

/**
 * Method support for the Plugin FuseSearch generate and create the dropdown menu of the research.
 * @param features the Features on the geoJson data to load to the Leaflet Map
 *         e.g. var features = geojsonData.features.
 * @param layers the json object collection of L.LayerGroup on the leaflet Map
 *          e.g. {"Hotel":L.featureGroup(),"Casino":L.featureGroup()}.
 * @param icons the json array of object who contains the relation from name key of the single layer and a L.Icon
 *      	e.g. icons[
 *      	Object {"0" :{name="Accommodation",  icon={...},  iconUrl="http://localhost:8181/re...icons/Accommodation.png",  altri elementi...}}
 *      	]
 * @returns {*}
 */
leafletUtil.displayFeatures = function(features, layers, icons) {
    try {
        //create div tiny-popup
        var popup = L.DomUtil.create('div', 'tiny-popup', map.getContainer());
        for (var feature,i=0; feature = features[i++];) {
            //var feature = features[id];
            if(leafletUtil.IsUndefined(feature)) {
                console.error('The Properties feature of geoJson not have a \'id\' property field');
            }
            if (feature.properties.hasOwnProperty('id')) {
                var category = feature.properties.categoryName; //get id int for get the object....
                //Load GeoJson on the map
                var site = L.geoJson(feature, {
                    pointToLayer: function (feature, latLng) {
                        try {
                            var icon;
                            if(icons && leafletUtil.IsJsonArray(icons)) {
                                try {
                                    for (var i = 0, myIcon; myIcon = icons[i++];) {
                                        //console.log('43:' + JSON.stringify(myIcon));
                                        //id icons object contains 'icons' property
                                        if (myIcon.hasOwnProperty('icon') &&
                                            myIcon.hasOwnProperty('categoryName') &&
                                            myIcon.categoryName == category) {
                                            console.info('Load the category of the layer:' + JSON.stringify(myIcon));
                                            icon = myIcon.icon; //myIcon[cat];
                                            break;
                                        }
                                    }
                                }catch(e){
                                    console.error('Some problem to load the category of the layer we use the Default Icon of leaflet.');
                                    icon = new L.Icon.Default();
                                }
                            }else{
                                console.error('The \'icons\' json Array we use is NULL or is not a Array, we use the default Leaflet Icon.');
                            }
                            if(!icon){
                                console.warn('The \'icon\' we use is NULL, we use the default Leaflet Icon');
                                icon = new L.Icon.Default();
                            }
                            //Create default marker with customize  icon
                            var marker = L.marker(latLng, {
                                icon: icon,
                                keyboard: false,
                                riseOnHover: true
                            });
                            //Set event Listener and zoom
                            if (!L.touch) {
                                marker.on('mouseover', function (e) {
                                    var nom = e.target.feature.properties['name'];
                                    var pos = map.latLngToContainerPoint(e.latlng);
                                    popup.innerHTML = nom;
                                    L.DomUtil.setPosition(popup, pos);
                                    L.DomUtil.addClass(popup, 'visible');

                                }).on('mouseout', function () {
                                    L.DomUtil.removeClass(popup, 'visible');
                                });
                            }
                            return marker;
                        }catch(e){
                            console.error('Exception::leafletUtil.displayFeatures -> '+e.message);
                        }
                    },
                    onEachFeature: function (feature, layer) {
                        leafletUtil.onEachFeature_bindPopup(feature, layer);
                    }
                });
            }
            //Add geojson to the specific layer category.
            var layer = layers[category];
            if (layer !== undefined) {
                layer.addLayer(site);
            }
        }
        return layers;
    }catch(e){
        console.error('displayFeatures ->'+e.message);
    }
};

/**
 * Method support the onEachFeature loop of Leaflet.
 * @param feature the Feature to analyze on the collection geojson.features of the geojson.
 * @param layer the Layer to analyze on the Leaflet Map (the markers).
 */
leafletUtil.onEachFeature_bindPopup = function(feature, layer){
    try {
        // Keep track of the layer(marker)
        feature.layer = layer;
        var props = feature.properties;
        if (props) {
            var popupOver =
                new L.popup({maxWidth:100,minWidth:50,maxHeight:200}).setContent(feature.properties.popupContent);
            layer.bindPopup(popupOver);
            layer.on('click', function (e) { e.target.bindPopup(popupOver).openPopup();});
            feature.layer = layer;
        }
    }catch(e){
        console.error('Exception::leafletUtil.onEachFeature_bindPopup -> '+e.message);
    }
};


leafletUtil.setupIcons = function(arrayJsonOrMap) {
    try {
        var icons = {icons:[]};
        for (var cat in arrayJsonOrMap) {
            var iconField;
            if (arrayJsonOrMap.hasOwnProperty(cat)) {
                var elements = arrayJsonOrMap[cat];
                for(var eleCat in elements) {
                    if (elements.hasOwnProperty(eleCat)) {
                        var element = elements[eleCat];
                        if (element.hasOwnProperty('icon')) iconField = 'icon';
                        else if (element.hasOwnProperty('image')) iconField = 'image';
                        else if (element.hasOwnProperty('img')) iconField = 'img';
                        if (!element.hasOwnProperty(iconField)) {
                            console.error('Can\'t find the iconField for the json object:' + JSON.stringify(element));
                        }

                        var url = leafletUtil.ctx + "/resources/img/mapicons/" + element[iconField];
                        var icon = L.icon({
                            iconUrl: url,
                            iconSize: [32, 32],
                            iconAnchor: [16, 37],
                            popupAnchor: [0, -28]
                        });
                        var subCategory;
                        if(element.clazz == 'macrocategory') subCategory = '';
                        else{
                            subCategory = element.clazz.replace('sub_','').replace('subcategory','').trim();
                        }
                        icons.icons.push({
                            name: element.name,
                            icon: icon,
                            iconUrl: url,
                            categoryId:eleCat,
                            category:element.value,
                            categoryName:element.name,
                            subCategoryOf:subCategory
                        }); //sub_Accommodation subcategory
                    }
                }
            }
        }
    }catch(e){
        console.error(e);
    }
    leafletUtil.icons = icons;
    return leafletUtil.icons;
};

/**
 * Method for set some geoJson properties on L.LayerGroup of Leaflet (very slow)
 * @param myLayer the L.LayerGroup to update.
 * @param geoJsonPropertiesToAdd the geoJson data with the properties ti upload on the L.LayerGroup.
 * @returns the new geoJsonData to upload to a LayerGroup.
 */
/*leafletUtil.loadPropertiesToGeoJson = function (myLayer, geoJsonPropertiesToAdd) {
    try {
        var geoJsonBase = myLayer.toGeoJSON();
        if (leafletUtil.IsEmpty(myLayer)) { //if the layer json object is empty
            myLayer = new L.markerClusterGroup({
                disableClusteringAtZoom: 19,
                iconCreateFunction: function (cluster) {
                    return L.divIcon({
                        html: cluster.getChildCount(), className: 'mycluster', iconSize: null
                    });
                }
            });
        }
        // Add custom popups to each using our custom feature properties
        /!*myLayerGroup.on('layeradd', function (e) {
         for (var key in objectProperties) {
         //feature.properties.news = 23; //add/update a properties to the feature.
         e.layer.properties[key] = objectProperties[key];
         }
         });*!/
        //If is the geoJson of a Layer or of a Marker.....
        if (geoJsonBase.hasOwnProperty('features'))geoJsonBase = geoJsonBase.features;
        for (var key in geoJsonBase) {
            if (geoJsonBase.hasOwnProperty(key) && key == 'properties') {
                console.warn('empty?' + JSON.stringify(geoJsonBase.properties));
                if (leafletUtil.IsEmpty(geoJsonBase.properties)) { //if the properties json object is empty
                    for (var key2 in geoJsonPropertiesToAdd) {
                        if (geoJsonPropertiesToAdd.hasOwnProperty(key2)) {
                            geoJsonBase.properties[key2] = geoJsonPropertiesToAdd[key2];   //add the new property...
                        }
                    }
                }
            }
        }
        return geoJsonBase;
    } catch (e) {
        console.error('loadPropertiesGeoJson -> ' + e.message);
    }
};*/

leafletUtil.getArrayObjectMarkerFromLayer = function(myLayerGroup){
    var markers = [];
    try{
        if(!$.isEmptyObject(myLayerGroup)) {
            console.log("Marker cluster is not empty go to check the Marker.");
            myLayerGroup.eachLayer(function (layer) {
                //note layer == marker
                try {
                    var lat = layer.getLatLng().lat;
                    var lng = layer.getLatLng().lng;
                    var label;
                    if(lat!=0 && lng !=0) {
                        label = layer.label._content; //get name with Leaflet.Label
                        var popupContent = layer.getPopup().getContent();
                        markers.push({name: label, latitude: lat, longitude: lng, popupContent: popupContent});
                    }
                    //i++;
                }catch(e){
                    console.error("Exception:getGeoJsonContentOfLayer -> "+e.message);
                }
            });
        }
    }catch(e){
        console.error("Exception:getGeoJsonContentOfLayer -> "+e.message);
    }
    return markers;
};

leafletUtil.setMaxBoundsMap = function(bounds){
    if(!bounds) bounds = new L.LatLngBounds(new L.LatLng(41.7, 8.4), new L.LatLng(44.930222, 13.4));
    map.setMaxBounds(bounds);
};

/*leafletUtil.loadGeoJsonToLayer =
    function(myLayerGroup,geoJsonData,styleFunction,coordsToLatLngFunction,onEachFeatureFunction,pointToLayerFunction){
    //Customize
    var myLayer = L.geoJson(undefined, {
        style: function (feature) {
            return feature.properties.style;
        },
        // correctly map the geojson coordinates on the image
        coordsToLatLng: function(coords) {
            return rc.unproject(coords);
        },
        // add a popup content to the marker
        onEachFeature: function (feature, layer) {
            layer.bindPopup(feature.properties.name);
        },
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: 8,
                fillColor: "#800080",
                color: "#D107D1",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        }
    });
    myLayer.addData(geoJsonData);
    myLayer.addTo(map);

};*/

/**
 * Function to delete the double quotes from a String .
 * @param stringText the Strign where delete all the double quotes.
 * @returns {*}
 */
leafletUtil.deleteDoubleQuotes = function(stringText) {
    stringText = stringText.trim().replace(/^"/,"").replace(/"$/,"");
    return stringText;
};


/**
 * href: http://jsfiddle.net/HbGM2/
 * e.g.<a href="#" onclick="hide('mydiv')">Close</a>
 * @param idElement the String of the id element to hide.
 */
leafletUtil.hide = function(idElement){document.getElementById(idElement).style.display = 'none';};

/**
 * href: http://jsfiddle.net/HbGM2/
 * e.g. <a href="#" onclick="show('mydiv')">Open</a>
 * @param idElement the String of the id element to hide.
 */
leafletUtil.show = function(idElement){document.getElementById(idElement).style.display = 'block';};

/**
 * href: http://jsfiddle.net/HbGM2/
 * e.g. <a href="#" onclick="show('mydiv')">Open</a>
 * e.g  <a href="#" onclick="hide('mydiv')">Close</a>
 * @param idElement the String of the id element to hide.
 */
leafletUtil.showAndHide = function(idElement){
    //document.getElementById(idElement).onclick = ;
    //or use addEventListener:
    //document.getElementById(idElement).addEventListener('click', begin, false);
    //If you need to pass a parameter, then:
    //document.getElementById(idElement).onclick = function() {begin(i);};
    if (!document.getElementById) {
        if (document.getElementById(idElement).style.display == 'block')
            document.getElementById(idElement).style.display = 'none';
        else
            document.getElementById(idElement).style.display = 'block';
    }else{
        console.error('Exception::showAndHide -> not supported on this browser');
    }
};

leafletUtil.randomLeafletIconFromJsonArray = function(){
    try {
        var jsonArray = leafletUtil.icons.icons;
        var icon = jsonArray[Math.floor(Math.random() * jsonArray.length)];
        return icon.icon;
    }catch(e){
        console.error(e.message);
    }
};



//UTILITY PROTOTYPE

/**
 * JavaScript format string functions
 */
String.prototype.format = function(){
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number){
        return typeof args[number] != 'undefined' ? args[number] :'{' + number + '}';
    });
};

String.prototype.replaceAll = function(toSearch,toreplace){
    if(this.includes(toSearch)) return this.split(toSearch).join(toreplace);
    else return this;
};

Array.prototype.isEmpty = function(){
    return !(typeof this != "undefined" && this != null && this.length > 0);
};
















