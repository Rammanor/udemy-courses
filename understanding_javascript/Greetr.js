/* 
  Greeter is a small library built as a small final project in
  a Udemy course, on javascript.
  The library tries to mimic the structure of Jquery, and also allow
  to chain methods on the object.
  It's purpose is to try out some of JS features such as:
    - IIFE
    - closure
    - function constructor
    - prototype chain
    - 'this' behavior
    - lexical scopes
    - etc...
*/


(function (global_object, $) {

  var Greeter = function (firstName, lastName, language) {
    return new Greeter.init(firstName, lastName, language);
  }

  var supportedLangs = ['en', 'es'];

  var greetings = {
    en: 'Hello',
    es: 'Hola'
  };

  var formal_greetings = {
    en: 'Greetings',
    es: 'Saludos'
  };

  var log_messages = {
    en: 'Logged in',
    es: 'Inicio sesion'
  };

  var utils = {
    greetMsg: function (Greeter, formal) {
      return formal ? Greeter.formalGreeting() : Greeter.greeting();
    },
    HTMLInsertDOM: function (selector, msg) {
      document.querySelector(selector).innerText = msg;
    },
    HTMLInsertJquery: function (selector, msg) {
      $(selector).html(msg);
    },
    addLangSupport: function (language, greeting, formal_greeting, log_msg) {
      greetings[language] = greeting;
      formal_greetings[language] = formal_greetings;
      log_messages[language] = log_msg;
      supportedLangs.push(language);
    },
    listSupportLanguages: function () {
      return supportedLangs.map(function (lang) { lang; });
    }
  }

  Greeter.prototype = {
    fullName: function () {
      return this.firstName + ' ' + this.lastName;
    },

    validate: function () {
      if  (supportedLangs.indexOf(this.language) === -1) {
        throw "Invalid Language";
      }
    },

    greeting: function () {
      return greetings[this.language] + ' ' + this.firstName + '!';
    },

    formalGreeting: function () {
      return formal_greetings[this.language] + ', ' + this.fullName();
    },

    greet: function (formal) {
      var msg = msg = this.greetMsg(this, formal);

      if (console) {
        console.log(msg);
      }

      return this;
    },

    log: function () {
      if (console) {
        console.log(log_messages[this.language] + ': ' + this.fullName());
      }

      return this;
    },

    setLang: function (language) {
      this.language = language;

      this.validate();

      return this;
    },

    HTMLGreeting: function (selector, formal) {
      if (!selector) {
        throw 'Missing selector';
      }

      var msg = msg = utils.greetMsg(this, formal);

      $ ? utils.HTMLInsertJquery(selector, msg) : utils.HTMLInsertDOM(selector, msg);

      return this;
    }
  };

  Greeter.init = function (firstName, lastName, language) {
    this.firstName = firstName || '';
    this.lastName = lastName || '';
    this.language = language || 'en';

    this.validate();
  }

  Greeter.init.prototype = Greeter.prototype;
  Greeter.Utils = utils;

  global_object.Greeter = global_object.G$ = Greeter;

})(window, $);