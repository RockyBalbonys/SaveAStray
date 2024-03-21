const mongoose = require('mongoose');

const questResSchema = new mongoose.Schema(
    {
        respondent: {
            type: String,
            unique: true
        },
        answers: {
            section1: {
                bestDescribe: String,
                email: String
            },
            section2: {
                awareAdoptionFee: Boolean
            },
            section3: {
                birthdate: Date,
                fbProfLink: String,
                fullAddress: String,
                fullName: String,
                occupation: String,
                phoneNum: String,
                shelterReach: Array
            },
            section4: {
                building: String,
                confirmedPets: String,
                householdMembers: String,
                isAllergic: String,
                isSupportive: String,
                liveWith: Array,
                moved: String,
                rent: String
            },
            section5: {
                adoptedBefore: String,
                agePreference: String,
                emergency: String,
                energyLevel: String,
                isWillingToChoose: String,
                isWillingToSpecialNeeds: String,
                listOfPets: String,
                rescueName: String,
                responsibleForCaring: String,
                responsibleForFinance: String,
            },
            section6: {
                considerToAdopt: String,
                preferInterview: String,
                preferTime: Array,
                prompted: String,
                validID: String
            }
        }
    }
)

const QuestRes = mongoose.model('QuestRes', questResSchema);

module.exports = QuestRes
