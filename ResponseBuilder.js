/**
 * ==========================================================
 * Project KARMA
 * ResponseBuilder.gs
 * ----------------------------------------------------------
 * Standard response factory used by all handlers.
 * ==========================================================
 */

class ResponseBuilder {

  static success(reply, data = null) {

    return {

      success: true,

      reply: reply,

      data: data

    };

  }

  static error(reply, code = null) {

    return {

      success: false,

      reply: reply,

      code: code

    };

  }

}