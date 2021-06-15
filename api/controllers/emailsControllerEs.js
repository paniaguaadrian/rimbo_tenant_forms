import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";
import hbs from "nodemailer-express-handlebars";
import customEnv from "custom-env";

// Env variables
customEnv.env(true);
const {
  RIMBO_EMAIL,
  SENDGRID_API,
  URL_ACCEPT_TT_BY_RIMBO,
  URL_REJECT_TT_BY_RIMBO,
  URL_ACCEPT_TT_CARD_BY_RIMBO,
} = process.env;

// ! RJ2 Form => RJ9 Email
const sendRJ2FormEmails = async (req, res) => {
  const { tenantsName, tenantsEmail } = req.body;

  const transporterRJ9 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: SENDGRID_API,
      },
    })
  );

  let optionsRJ9 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "viewsEs/",
      defaultLayout: "rj9Email",
    },
    viewPath: "viewsEs/",
  };

  transporterRJ9.use("compile", hbs(optionsRJ9));

  // RJ9 email @Tenant
  const tenantEmail = {
    from: "Rimbo info@rimbo.rent",
    to: tenantsEmail, // Tenant email
    subject: `Hemos recibido la información. ¡Acaba de comenzar tu viaje con Rimbo!`,

    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./viewsEs/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj9Email",
    context: {
      tenantsName,
    },
  };

  transporterRJ9.sendMail(tenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! RJ2 Form => RJXX3 Email with tenant's files attached
const sendRJ3FilesEmail = async (req, res) => {
  const {
    agencyName,
    agencyContactPerson,
    agencyPhonePerson,
    agencyEmailPerson,
    tenantsName,
    tenantsPhone,
    tenantsEmail,
    tenancyID,
    documentImageFront,
    documentImageBack,
    documentNumber,
    monthlyNetIncome,
    jobType,
    tenantsAddress,
    tenantsZipCode,
    rentAmount,
    product,
    rentDuration,
    rentalAddress,
    rentalCity,
    rentalPostalCode,
    landlordName,
    landlordPhone,
    landlordEmail,
  } = req.body;

  const transporterRJXX3Files = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: SENDGRID_API,
      },
    })
  );

  let optionsRJXX3 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "viewsEs/",
      defaultLayout: "rjxx3FilesEmail",
    },
    viewPath: "viewsEs/",
  };

  transporterRJXX3Files.use("compile", hbs(optionsRJXX3));

  // RJXX3 email @Rimbo
  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: RIMBO_EMAIL, // Rimbo email
    subject: `${tenancyID} - ${tenantsName} listo/a para evaluación`,
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./viewsEs/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rjxx3FilesEmail",
    context: {
      agencyName,
      agencyContactPerson,
      agencyPhonePerson,
      agencyEmailPerson,
      tenantsName,
      tenantsPhone,
      tenantsEmail,
      tenancyID,
      documentImageFront,
      documentImageBack,
      documentNumber,
      monthlyNetIncome,
      jobType,
      tenantsAddress,
      tenantsZipCode,
      rentAmount,
      product,
      rentDuration,
      rentalAddress,
      rentalCity,
      rentalPostalCode,
      landlordName,
      landlordPhone,
      landlordEmail,
      URL_ACCEPT_TT_BY_RIMBO,
      URL_REJECT_TT_BY_RIMBO,
    },
  };

  transporterRJXX3Files.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! RJXX3 Email => RJ11 Email After Rimbo accepts tenant
const sendRJ11Emails = async (req, res) => {
  const {
    agencyContactPerson,
    agencyEmailPerson,
    rentalAddress,
    tenancyID,
    tenantsName,
    tenantsNameTwo,
    tenantsNameThree,
    tenantsNameFour,
  } = req.body;

  const transporterRJ11 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: SENDGRID_API,
      },
    })
  );

  let optionsRJ11 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "viewsEs/",
      defaultLayout: "rj11Email",
    },
    viewPath: "viewsEs/",
  };

  transporterRJ11.use("compile", hbs(optionsRJ11));

  // RJ11 Email  @PM/Agency
  const pmEmail = {
    from: "Rimbo info@rimbo.rent",
    to: agencyEmailPerson, // pm's email
    subject: `Alquiler en ${rentalAddress} Aceptado!`,
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./viewsEs/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj11Email",
    context: {
      agencyContactPerson,
      agencyEmailPerson,
      tenancyID,
      tenantsName,
      tenantsNameTwo,
      tenantsNameThree,
      tenantsNameFour,
    },
  };
  transporterRJ11.sendMail(pmEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });
  res.status(200).json();
};

// ! RJXX3 Email => RJ12 Email After Rimbo rejects tenant
const sendRJ12Emails = async (req, res) => {
  const {
    tenantsName,
    agencyName,
    agencyContactPerson,
    agencyEmailPerson,
    rentalAddress,
    tenancyID,
    randomID,
  } = req.body;

  const transporterRJ12 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: SENDGRID_API,
      },
    })
  );

  const transporterRJ12R = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: SENDGRID_API,
      },
    })
  );

  let optionsRJ12 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "viewsEs/",
      defaultLayout: "rj12Email",
    },
    viewPath: "viewsEs/",
  };

  let optionsRJ12R = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "viewsEs/",
      defaultLayout: "rj12REmail",
    },
    viewPath: "viewsEs/",
  };

  transporterRJ12.use("compile", hbs(optionsRJ12));
  transporterRJ12R.use("compile", hbs(optionsRJ12R));

  // RJ12 Email  @PM/Agency
  const pmEmail = {
    from: "Rimbo info@rimbo.rent",
    to: agencyEmailPerson, // pm's email
    subject: `Alquiler en ${rentalAddress} Rechazado.`,

    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./viewsEs/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj12Email",
    context: {
      tenantsName,
      agencyName,
      agencyContactPerson,
      agencyEmailPerson,
      rentalAddress,
      tenancyID,
      randomID,
    },
  };

  // RJ12 Email  @Rimbo
  const RimboEmail = {
    from: "Rimbo info@rimbo.rent",
    to: RIMBO_EMAIL, // rimbo's email
    subject: `${tenancyID} - Alquiler en ${rentalAddress} Rechazado`,
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./viewsEs/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj12Email",
    context: {
      tenantsName,
      agencyName,
      agencyContactPerson,
      agencyEmailPerson,
      tenancyID,
      randomID,
    },
  };

  transporterRJ12.sendMail(pmEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  transporterRJ12R.sendMail(RimboEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! RJ3 Form =>  RJ15 Email
const sendRJ3FormEmail = async (req, res) => {
  const {
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    timestamps,
    agencyEmailPerson,
    agencyContactPerson,
    agencyName,
    rentalAddress,
    randomID,
    tenancyID,
  } = req.body;

  const transporterRJ15 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: SENDGRID_API,
      },
    })
  );

  let optionsRJ15 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "viewsEs/",
      defaultLayout: "rj15Email",
    },
    viewPath: "viewsEs/",
  };

  transporterRJ15.use("compile", hbs(optionsRJ15));

  // RJ15 email @Rimbo
  const RimbosEmail = {
    from: "Rimbo info@rimbo.rent",
    to: RIMBO_EMAIL, // Rimbo email
    subject: `${tenancyID} - ${tenantsName} Tarjeta registrada correctamente`,
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./viewsEs/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj15Email",
    context: {
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      timestamps,
      agencyEmailPerson,
      agencyContactPerson,
      randomID,
      tenancyID,
      agencyName,
      rentalAddress,
      URL_ACCEPT_TT_CARD_BY_RIMBO,
    },
  };

  transporterRJ15.sendMail(RimbosEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! RJ15 Email => RJXX5 Email TT
const sendRJ15EmailsTT = async (req, res) => {
  const {
    tenantsName,
    tenantsEmail,
    tenantsPhone,
    timestamps,
    agencyEmailPerson,
    agencyContactPerson,
    agencyName,
    rentalAddress,
    randomID,
    tenancyID,
  } = req.body;

  const transporterRJXX5 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: SENDGRID_API,
      },
    })
  );

  let optionsRJXX5 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "viewsEs/",
      defaultLayout: "rjxx5Email",
    },
    viewPath: "viewsEs/",
  };

  transporterRJXX5.use("compile", hbs(optionsRJXX5));

  // RJXX5 email @Tenant
  const TenantsEmail = {
    from: "Rimbo info@rimbo.rent",
    to: tenantsEmail, // Tenant email
    subject: `¡Tarjeta registrada correctamente!`,
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./viewsEs/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rjxx5Email",
    context: {
      tenantsName,
      tenantsEmail,
      tenantsPhone,
      timestamps,
      agencyEmailPerson,
      agencyContactPerson,
      agencyName,
      rentalAddress,
      randomID,
      tenancyID,
    },
  };

  transporterRJXX5.sendMail(TenantsEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! RJ15 Email => RJ16 Email PM
const sendRJ15EmailsPM = async (req, res) => {
  const {
    agencyContactPerson,
    agencyEmailPerson,
    agencyName,
    tenancyID,
    tenantsName,
    tenantsNameTwo,
    tenantsNameThree,
    tenantsNameFour,
  } = req.body;

  const transporterRJ16 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: SENDGRID_API,
      },
    })
  );

  let optionsRJ16 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "viewsEs/",
      defaultLayout: "rj16Email",
    },
    viewPath: "viewsEs/",
  };

  transporterRJ16.use("compile", hbs(optionsRJ16));

  // RJ16 email @PM
  const PMsEmail = {
    from: "Rimbo info@rimbo.rent",
    to: agencyEmailPerson, // PM email
    subject: `Registro de alquiler finalizado`,
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./viewsEs/images/rimbo-logo.png",
        cid: "rimbologo",
      },
    ],
    template: "rj16Email",
    context: {
      agencyContactPerson,
      agencyEmailPerson,
      agencyName,
      tenancyID,
      tenantsName,
      tenantsNameTwo,
      tenantsNameThree,
      tenantsNameFour,
    },
  };

  transporterRJ16.sendMail(PMsEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! RJ18 Email => RJ17 email
const sendRJ18EmailTT = async (req, res) => {
  const { tenancyID, randomID, tenantsName, tenantsEmail } = req.body;

  const transporterRJ17 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: SENDGRID_API,
      },
    })
  );

  let optionsRJ17 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "viewsEs/",
      defaultLayout: "rj17Email",
    },
    viewPath: "viewsEs/",
  };

  transporterRJ17.use("compile", hbs(optionsRJ17));

  // RJ17 email @Tenant
  const TenantEmail = {
    from: "Rimbo info@rimbo.rent",
    to: tenantsEmail, // Tenant email
    subject: `¡Te damos la bienvenida a la familia Rimbo! Registro finalizado`,
    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./viewsEs/images/rimbo-logo.png",
        cid: "rimbologo",
      },
      {
        filename: "Reglas_Generales_y_Guia_Inquilino_Rimbo.pdf",
        path: "./viewsEs/images/Reglas_Generales_y_Guia_Inquilino_Rimbo.pdf",
      },
    ],
    template: "rj17Email",
    context: {
      tenancyID,
      randomID,
      tenantsName,
      tenantsEmail,
    },
  };

  transporterRJ17.sendMail(TenantEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

// ! RJ18 Email => RJ20 email
const sendRJ18EmailPM = async (req, res) => {
  const {
    tenancyID,
    randomID,
    agencyContactPerson,
    agencyEmailPerson,
    rentalAddress,
  } = req.body;

  const transporterRJ20 = nodemailer.createTransport(
    sgTransport({
      auth: {
        api_key: SENDGRID_API,
      },
    })
  );

  let optionsRJ20 = {
    viewEngine: {
      extname: ".handlebars",
      layoutsDir: "viewsEs/",
      defaultLayout: "rj20Email",
    },
    viewPath: "viewsEs/",
  };

  transporterRJ20.use("compile", hbs(optionsRJ20));

  // RJ20 email @PM
  const PMEmail = {
    from: "Rimbo info@rimbo.rent",
    to: agencyEmailPerson, // PM email
    subject: `¡Enhorabuena! La propiedad ya está cubierta por Rimbo`,

    attachments: [
      {
        filename: "rimbo-logo.png",
        path: "./viewsEs/images/rimbo-logo.png",
        cid: "rimbologo",
      },
      {
        filename: "Reglas_Generales_y_Guia_Propietario_RIMBO.pdf",
        path: "./viewsEs/images/Reglas_Generales_y_Guia_Propietario_RIMBO.pdf",
      },
    ],
    template: "rj20Email",
    context: {
      tenancyID,
      randomID,
      agencyContactPerson,
      agencyEmailPerson,
      rentalAddress,
    },
  };

  transporterRJ20.sendMail(PMEmail, (err, data) => {
    if (err) {
      console.log("There is an error here...!" + err);
    } else {
      console.log("Email sent!");
    }
  });

  res.status(200).json();
};

export {
  sendRJ2FormEmails,
  sendRJ11Emails,
  sendRJ12Emails,
  sendRJ3FormEmail,
  sendRJ15EmailsTT,
  sendRJ15EmailsPM,
  sendRJ3FilesEmail,
  sendRJ18EmailTT,
  sendRJ18EmailPM,
};
