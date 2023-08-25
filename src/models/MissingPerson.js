export class MissingPerson {
  constructor(rawJson) {
    this.raw = rawJson;
    if (!rawJson.updated) {
      this.getStub(rawJson);
      return;
    }
    this.fullName = this.getName(rawJson.subjectIdentification);
    this.currentAge = this.getCurrentAge(rawJson.subjectIdentification);
    this.missingAge = this.getMissingAge(rawJson.subjectIdentification);
    this.height = rawJson.subjectDescription.heightFrom;
    this.weight = rawJson.subjectDescription.weightFrom;
    this.ethnicity = this.getEthnicity(rawJson.subjectDescription);
    this.sex = rawJson.subjectDescription.sex.name;
  }

  get properties() {
    return [
      "fullName",
      "currentAge",
      "missingAge",
      "height",
      "weight",
      "ethnicity",
      "sex",
    ];
  }

  getStub(rawJson) {
    this.fullName = rawJson["First Name"] + " " + rawJson["Last Name"];
    this.location = rawJson["City"] + ", " + rawJson["State"];
    this.currentAge = "?";
    this.missingAge = rawJson["Missing Age"];
    this.height = "?";
    this.weight = "?";
    this.ethnicity = "?";
    this.sex = rawJson["Sex"];
  }

  getEthnicity(description) {
    const eths = description.ethnicities;
    let output = "";
    for (let i = 0; i < eths.length; i++) {
      output += eths[i].name;
      if (i !== eths.length - 1) {
        output += "/";
      }
    }
    return output;
  }

  getCurrentAge(subjId) {
    if (subjId.currentMinAge === subjId.currentMaxAge) {
      return subjId.currentMinAge;
    } else {
      return subjId.currentMinAge + "-" + subjId.currentMaxAge;
    }
  }

  getMissingAge(subjId) {
    if (subjId.computedMissingMinAge === subjId.computedMissingMaxAge) {
      return subjId.computedMissingMinAge;
    } else {
      return subjId.computedMissingMinAge + "-" + subjId.computedMissingMaxAge;
    }
  }

  getName(subjId) {
    let output = subjId.firstName + " ";
    if (subjId.middleName) {
      output += subjId.middleName + " ";
    }
    output += subjId.lastName;
    return output;
  }

  *getAll() {
    yield this.fullName;
    yield this.currentAge;
    yield this.missingAge;
    yield this.height;
    yield this.weight;
    yield this.ethnicity;
    yield this.sex;
  }
}
