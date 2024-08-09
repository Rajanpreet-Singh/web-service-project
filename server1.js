const express = require("express");
const app = express();
const fileuploader = require("express-fileupload");
const mysql2 = require("mysql2");

app.listen(2004, function () {
  console.log("Server Started");
});
const congObj = {
  host: "127.0.0.1",
  user: "root",
  password: "Sukh0055",
  database: "signup",
  dateStrings: true,
};
const mysql = mysql2.createConnection(congObj);
app.use(express.static("project"));
mysql.connect(function (err) {
  if (err == null) console.log("Connected to database");
  else console.log(err.message);
});
//--------------------------------------------------index page--------------------------------------------------------------------------------------------//
app.get("/Signup", function (req, resp) {
  let filePath = process.cwd() + "/project/index.html";
  resp.sendFile(filePath);
});
app.get("/done", function (req, resp) {
  const email = req.query.email;
  const password = req.query.Passkuch;
  const utype = req.query.Utypekuch;
  const status = 1;
  mysql.query(
    "insert into users values (?,?,?,?)",
    [email, password, utype, status],
    function (err) {
      if (err == null) resp.send("Record Saved Successfullyy");
      else resp.send(err.message);
    }
  );
});
app.get("/check-email", function (req, resp) {
  mysql.query(
    "select * from users where emailid=?",
    [req.query.kuchEmail],
    function (err, resultJsonAry) {
      if (resultJsonAry.length == 1) resp.send("Not Available");
      else resp.send("Available");
    }
  );
});
app.get("/check-logemail", function (req, resp) {
  mysql.query(
    "select * from users where emailid=?",
    [req.query.Someemail],
    function (err, resultJsonAry) {
      if (resultJsonAry.length == 1) resp.send("Correct");
      else resp.send("Incorrect");
    }
  );
});
app.get("/check-logpass", function (req, resp) {
  mysql.query(
    "select * from users where pwd=? and emailid=?",
    [req.query.Somepass, req.query.koiemail],
    function (err, resultJsonAry) {
      if (resultJsonAry.length == 1) resp.send("Correct");
      else resp.send("Incorrect");
    }
  );
});
app.get("/over", function (req, resp) {
  const email = req.query.chemail;
  const password = req.query.chPass;
  mysql.query(
    "select * from users where emailid=? and pwd=?",
    [email, password],
    function (err, resultjsonary) {
      if (err) {
        resp.send(err.message);
        return;
      }
      if (resultjsonary.length == 1) {
        if (resultjsonary[0].status == 1) {
          const utype = resultjsonary[0].utype;
          resp.send(utype);
        } else resp.send("Blocked Account");
      } else {
        resp.send("Invalid email or password");
      }
    }
  );
});
//-------------------------------------------------------XX-----------------------------------------------------------------------------------------//
//--------------------------------------------------Customer dashboard-------------------------------------------------------------------------------//
app.get("/custdash", function (req, resp) {
  let filePath = process.cwd() + "/project/customer dash.html";
  resp.sendFile(filePath);
});
app.get("/profile1", function (req, resp) {
  let filePath = process.cwd() + "/project/profile1.html";
  resp.sendFile(filePath);
});
app.get("/profilesave", function (req, resp) {
  const Email = req.query.email;
  const Firstname = req.query.firstname;
  const Lastname = req.query.lastname;
  const Contactnumber = req.query.contactnumber;
  const Address = req.query.address;
  const City = req.query.city;
  const State = req.query.state;
  const Country = req.query.country;
  const Ppic = req.query.ppic;

  mysql.query(
    "insert into custprofile values (?,?,?,?,?,?,?,?,?)",
    [
      Email,
      Firstname,
      Lastname,
      Contactnumber,
      Address,
      City,
      State,
      Country,
      Ppic,
    ],
    function (err) {
      if (err == null) resp.send("Profile Saved");
      else resp.send(err.message);
    }
  );
});
app.get("/fetch", function (req, resp) {
  mysql.query(
    "select * from custprofile where emailid=?",
    [req.query.searchemail],
    function (err, resultJsonAry) {
      resp.send(resultJsonAry);
      {
      }
    }
  );
});

app.get("/cfetch", function (req, resp) {
  mysql.query(
    "select * from custprofile where emailid=?",
    [req.query.email],
    function (err, resultJsonAry) {
      resp.send(resultJsonAry);
      {
      }
    }
  );
});
app.get("/postjob", function (req, resp) {
  const rid = 0;
  const Email = req.query.custemail;
  const Work = req.query.custwork;
  const address = req.query.custaddress;
  const city = req.query.custcity;
  const upto = req.query.custupto;
  const task = req.query.custtask;

  mysql.query(
    "insert into tasks values (?,?,?,?,?,?,?)",
    [rid, Email, Work, address, city, upto, task],
    function (err) {
      if (err == null) resp.send("Job posted");
      else resp.send(err.message);
    }
  );
});
app.get("/change", function (req, resp) {
  const nemail = req.query.emaiL;
  const npassword = req.query.pass;
  const opassword = req.query.opass;

  mysql.query(
    "update users set pwd=? where emailid=? and pwd=?",
    [npassword, nemail, opassword],
    function (err) {
      if (err) {
        resp.send("Can't update password");
      } else resp.send(" Password Updated successfully");
    }
  );
});
app.get("/reqmanager", function (req, resp) {
  let filePath = process.cwd() + "/project/req.manager.html";
  resp.sendFile(filePath);
});
app.get("/angular-fetchservice-data", function (req, resp) {
  mysql.query("select * from tasks", function (err, resultJsonAry) {
    resp.send(resultJsonAry);
  });
});
app.get("/angular-deletework", function (req, resp) {
  const email = req.query.emailkuch;

  mysql.query(
    "delete from tasks where emailid=?",
    [email],
    function (err, result) {
      if (err == null) {
        if (result.affectedRows == 1)
          resp.send("Record Deleted Successfullyyy");
        else resp.send("Invalid Email ID");
      } else resp.send(err.message);
    }
  );
});
app.get("/fetch-email-record", function (req, resp) {
  mysql.query(
    "select * from providers where emailid=?",
    [req.query.email],
    function (err, resultJsonAry) {
      resp.send(resultJsonAry);
    }
  );
});

app.get("/provsearch", function (req, resp) {
  let filePath = process.cwd() + "/project/searchprov.html";
  resp.sendFile(filePath);
});
app.get("/angular-provfetch-data", function (req, resp) {
  mysql.query("select * from providers", function (err, resultJsonAry) {
    resp.send(resultJsonAry);
  });
});
app.get("/angular-fetch-distinct-location", function (req, resp) {
  mysql.query(
    "select distinct location from providers",
    function (err, resultJsonAry) {
      resp.send(resultJsonAry);
    }
  );
});
app.get("/fetch-one-record", function (req, resp) {
  mysql.query(
    "select * from providers where location=?",
    [req.query.location],
    function (err, resultJsonAry) {
      resp.send(resultJsonAry);
    }
  );
});
app.get("/angular-fetch-distinct-category", function (req, resp) {
  mysql.query(
    "select distinct category from providers",
    function (err, resultJsonAry) {
      resp.send(resultJsonAry);
    }
  );
});
app.get("/fetch-both-record", function (req, resp) {
  mysql.query(
    "select * from providers where category=? and location=?",
    [req.query.category, req.query.location],
    function (err, resultJsonAry) {
      resp.send(resultJsonAry);
    }
  );
});
//-----------------------------------------------------------------X--------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------Service Provider Dashboard-----------------------------------------------------------------------------------------//
app.get("/service-prov-dash", function (req, resp) {
  let filePath = process.cwd() + "/project/service-provider-dash.html";
  resp.sendFile(filePath);
});
app.get("/provprofile", function (req, resp) {
  let filePath = process.cwd() + "/provider-profile.html";
  resp.sendFile(filePath);
});
app.use(express.urlencoded({ extended: true }));
app.use(fileuploader());
app.post("/provprofilesaving", function (req, resp) {
  const emailidd = req.body.email;
  const named = req.body.named;
  const contact = req.body.contact;
  const gender = req.body.gender;
  const category = req.body.category;
  const firm = req.body.firm;
  const website = req.body.website;
  const location = req.body.location;
  const since = req.body.established;
  let filename;
  if (req.files == null)
    //when no pic selecetd
    filename = "nopic.jpg";
  else {
    filename = req.files.idproof.name;
    let path = process.cwd() + "/project/uploads/" + filename;
    req.files.idproof.mv(path);
  }

  req.body.idproof = filename;
  const otherinfo = req.body.prev;
  mysql.query(
    "insert into providers values (?,?,?,?,?,?,?,?,?,?,?)",
    [
      emailidd,
      named,
      contact,
      gender,
      category,
      firm,
      website,
      location,
      since,
      filename,
      otherinfo,
    ],
    function (err) {
      if (err == null) resp.send("Profile Saved");
      else resp.send(err.message);
    }
  );
});
app.get("/provfetch", function (req, resp) {
  mysql.query(
    "select * from providers where emailid=?",
    [req.query.searchemail],
    function (err, resultJsonAry) {
      resp.send(resultJsonAry);
      {
      }
    }
  );
});
app.get("/findjob", function (req, resp) {
  let filePath = process.cwd() + "/project/findjob.html";
  resp.sendFile(filePath);
});
app.get("/all-fetch-data", function (req, resp) {
  mysql.query("select * from tasks ", function (err, resultJsonAry) {
    resp.send(resultJsonAry);
    {
    }
  });
});
app.get("/changes", function (req, resp) {
  const nemail = req.query.emaiL;
  const npassword = req.query.pass;
  const opassword = req.query.opass;

  mysql.query(
    "update users set pwd=? where emailid=? and pwd=?",
    [npassword, nemail, opassword],
    function (err) {
      if (err) {
        resp.send("Can't update password");
      } else resp.send(" Password Updated successfully");
    }
  );
});
//-----------------------------------------------------------------X-----------------------------------------------------------------------------------//
//--------------------------------------------------------------------Admin Page------------------------------------------------------------------------//
app.get("/admindash", function (req, resp) {
  let filePath = process.cwd() + "/project/admin-dash.html";
  resp.sendFile(filePath);
});
app.get("/cust-info", function (req, resp) {
  let filePath = process.cwd() + "/project/cust-info.html";
  resp.sendFile(filePath);
});
app.get("/angular-fetch-data", function (req, resp) {
  mysql.query("select * from users", function (err, resultJsonAry) {
    resp.send(resultJsonAry);
  });
});
app.get("/angular-delete", function (req, resp) {
  const email = req.query.emailkuch;
  mysql.query(
    "delete from users where emailid=?",
    [email],
    function (err, result) {
      if (err == null) {
        if (result.affectedRows == 1)
          resp.send("Record Deleted Successfullyyy");
        else resp.send("Invalid Email ID");
      } else resp.send(err.message);
    }
  );
});
app.get("/angular-blockstat", function (req, resp) {
  const email = req.query.emailkuch;
  const status = 0;

  mysql.query(
    "select * from users where emailid=?",
    [email],
    function (err, result) {
      if (err) {
        resp.send(err.message);

        return;
      } else {
        const currentStatus = result[0].status;

        if (currentStatus === 0) {
          resp.send("Already Status='0'");

          return;
        } else {
          mysql.query(
            "update users set status=? where emailid=? ",
            [status, email],
            function (errr) {
              if (errr) resp.send(errr.message);
              else resp.send("User status updated successfully.");
            }
          );
        }
      }
    }
  );
});
app.get("/angular-resume", function (req, resp) {
  const email = req.query.emailkuch;
  const status = 1;

  mysql.query(
    "select * from users where emailid=?",
    [email],
    function (err, result) {
      if (err) {
        resp.send(err.message);

        return;
      } else {
        const currentStatus = result[0].status;

        if (currentStatus === 1) {
          resp.send("ALREADY STATUS='1'");

          return;
        } else {
          mysql.query(
            "update users set status=? where emailid=? ",
            [status, email],
            function (errr) {
              if (errr) resp.send(errr.message);
              else resp.send("User status updated successfully.");
            }
          );
        }
      }
    }
  );
});
app.get("/allprovprofile", function (req, resp) {
  let filePath = process.cwd() + "/project/all-providers.html";
  resp.sendFile(filePath);
});
app.get("/angular-fetchprovdata", function (req, resp) {
  mysql.query("select * from providers", function (err, resultJsonAry) {
    resp.send(resultJsonAry);
  });
});

app.get("/allcustomprofile", function (req, resp) {
  let filePath = process.cwd() + "/project/all-customers.html";
  resp.sendFile(filePath);
});

app.get("/angular-custfetch-data", function (req, resp) {
  mysql.query("select * from custprofile", function (err, resultJsonAry) {
    resp.send(resultJsonAry);
  });
});
