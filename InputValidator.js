class InputValidator {

  static employeeId(id){

      return id
              .trim()
              .toUpperCase();

  }

  static dob(dob){

      return dob.trim();

  }

}