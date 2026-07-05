/**
 * ==========================================================
 * Project KARMA
 * Config.js
 * ==========================================================
 */

const SCRIPT_PROPERTIES =
    PropertiesService.getScriptProperties();

const WHATSAPP = {

  API_VERSION:
      SCRIPT_PROPERTIES.getProperty(
          "WHATSAPP_API_VERSION"
      ),

  PHONE_NUMBER_ID:
      SCRIPT_PROPERTIES.getProperty(
          "WHATSAPP_PHONE_NUMBER_ID"
      ),

  ACCESS_TOKEN:
      SCRIPT_PROPERTIES.getProperty(
          "WHATSAPP_ACCESS_TOKEN"
      )

};