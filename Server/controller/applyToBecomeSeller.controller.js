const applyToBecomeSeller = require("../models/applyToBecomeSeller");
const _ = require("lodash")
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


// Template email for admin when we receive an application
const templateAdmin = (args) => (
    `
       <head>
         <meta name="viewport" content="width=device-width" />
         <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
         <title>Simple Transactional Email</title>
         <style>
         /* -------------------------------------
             GLOBAL RESETS
         ------------------------------------- */
         
         /*All the styling goes here*/
         
         img {
             border: none;
             -ms-interpolation-mode: bicubic;
             max-width: 100%; 
         }

         body {
             background-color: #f6f6f6;
             font-family: sans-serif;
             -webkit-font-smoothing: antialiased;
             font-size: 14px;
             line-height: 1.4;
             margin: 0;
             padding: 0;
             -ms-text-size-adjust: 100%;
             -webkit-text-size-adjust: 100%; 
         }

         table {
             border-collapse: separate;
             mso-table-lspace: 0pt;
             mso-table-rspace: 0pt;
             width: 100%; }
             table td {
             font-family: sans-serif;
             font-size: 14px;
             vertical-align: top; 
         }

         /* -------------------------------------
             BODY & CONTAINER
         ------------------------------------- */

         .body {
             background-color: #f6f6f6;
             width: 100%; 
         }

         /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
         .container {
             display: block;
             margin: 0 auto !important;
             /* makes it centered */
             max-width: 580px;
             padding: 10px;
             width: 580px; 
         }

         /* This should also be a block element, so that it will fill 100% of the .container */
         .content {
             box-sizing: border-box;
             display: block;
             margin: 0 auto;
             max-width: 580px;
             padding: 10px; 
         }

         /* -------------------------------------
             HEADER, FOOTER, MAIN
         ------------------------------------- */
         .main {
             background: #ffffff;
             border-radius: 3px;
             width: 100%; 
         }

         .wrapper {
             box-sizing: border-box;
             padding: 20px; 
         }

         .content-block {
             padding-bottom: 10px;
             padding-top: 10px;
         }

         .footer {
             clear: both;
             margin-top: 10px;
             text-align: center;
             width: 100%; 
         }
             .footer td,
             .footer p,
             .footer span,
             .footer a {
             color: #999999;
             font-size: 12px;
             text-align: center; 
         }

         /* -------------------------------------
             TYPOGRAPHY
         ------------------------------------- */
         h1,
         h2,
         h3,
         h4 {
             color: #000000;
             font-family: sans-serif;
             font-weight: 400;
             line-height: 1.4;
             margin: 0;
             margin-bottom: 30px; 
         }

         h1 {
             font-size: 35px;
             font-weight: 300;
             text-align: center;
             text-transform: capitalize; 
         }

         p,
         ul,
         ol {
             font-family: sans-serif;
             font-size: 14px;
             font-weight: normal;
             margin: 0;
             margin-bottom: 15px; 
         }
             p li,
             ul li,
             ol li {
             list-style-position: inside;
             margin-left: 5px; 
         }

         a {
             color: #3498db;
             text-decoration: underline; 
         }

         /* -------------------------------------
             BUTTONS
         ------------------------------------- */
         .btn {
             box-sizing: border-box;
             width: 100%; }
             .btn > tbody > tr > td {
             padding-bottom: 15px; }
             .btn table {
             width: auto; 
         }
             .btn table td {
             background-color: #ffffff;
             border-radius: 5px;
             text-align: center; 
         }
             .btn a {
             background-color: #ffffff;
             border: solid 1px #3498db;
             border-radius: 5px;
             box-sizing: border-box;
             color: #3498db;
             cursor: pointer;
             display: inline-block;
             font-size: 14px;
             font-weight: bold;
             margin: 0;
             padding: 12px 25px;
             text-decoration: none;
             text-transform: capitalize; 
         }

         .btn-primary table td {
             background-color: #3498db; 
         }

         .btn-primary a {
             background-color: #3498db;
             border-color: #3498db;
             color: #ffffff; 
         }

         /* -------------------------------------
             OTHER STYLES THAT MIGHT BE USEFUL
         ------------------------------------- */
         .last {
             margin-bottom: 0; 
         }

         .first {
             margin-top: 0; 
         }

         .align-center {
             text-align: center; 
         }

         .align-right {
             text-align: right; 
         }

         .align-left {
             text-align: left; 
         }

         .clear {
             clear: both; 
         }

         .mt0 {
             margin-top: 0; 
         }

         .mb0 {
             margin-bottom: 0; 
         }

         .preheader {
             color: transparent;
             display: none;
             height: 0;
             max-height: 0;
             max-width: 0;
             opacity: 0;
             overflow: hidden;
             mso-hide: all;
             visibility: hidden;
             width: 0; 
         }

         .powered-by a {
             text-decoration: none; 
         }

         hr {
             border: 0;
             border-bottom: 1px solid #f6f6f6;
             margin: 20px 0; 
         }

         /* -------------------------------------
             RESPONSIVE AND MOBILE FRIENDLY STYLES
         ------------------------------------- */
         @media only screen and (max-width: 620px) {
             table[class=body] h1 {
             font-size: 28px !important;
             margin-bottom: 10px !important; 
             }
             table[class=body] p,
             table[class=body] ul,
             table[class=body] ol,
             table[class=body] td,
             table[class=body] span,
             table[class=body] a {
             font-size: 16px !important; 
             }
             table[class=body] .wrapper,
             table[class=body] .article {
             padding: 10px !important; 
             }
             table[class=body] .content {
             padding: 0 !important; 
             }
             table[class=body] .container {
             padding: 0 !important;
             width: 100% !important; 
             }
             table[class=body] .main {
             border-left-width: 0 !important;
             border-radius: 0 !important;
             border-right-width: 0 !important; 
             }
             table[class=body] .btn table {
             width: 100% !important; 
             }
             table[class=body] .btn a {
             width: 100% !important; 
             }
             table[class=body] .img-responsive {
             height: auto !important;
             max-width: 100% !important;
             width: auto !important; 
             }
         }

         /* -------------------------------------
             PRESERVE THESE STYLES IN THE HEAD
         ------------------------------------- */
         @media all {
             .ExternalClass {
             width: 100%; 
             }
             .ExternalClass,
             .ExternalClass p,
             .ExternalClass span,
             .ExternalClass font,
             .ExternalClass td,
             .ExternalClass div {
             line-height: 100%; 
             }
             .apple-link a {
             color: inherit !important;
             font-family: inherit !important;
             font-size: inherit !important;
             font-weight: inherit !important;
             line-height: inherit !important;
             text-decoration: none !important; 
             }
             #MessageViewBody a {
             color: inherit;
             text-decoration: none;
             font-size: inherit;
             font-family: inherit;
             font-weight: inherit;
             line-height: inherit;
             }
             .btn-primary table td:hover {
             background-color: #34495e !important;
             }
             .btn-primary a:hover {
             background-color: #34495e !important;
             border-color: #34495e !important; 
             } 
         }

         </style>
     </head>
     <body class="">
         <span class="preheader">This is preheader text. Some clients will show this text as a preview.</span>
         <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
         <tr>
             <td>&nbsp;</td>
             <td class="container">
             <div class="content">

                 <!-- START CENTERED WHITE CONTAINER -->
                 <table role="presentation" class="main">

                 <!-- START MAIN CONTENT AREA -->
                 <tr>
                     <td class="wrapper">
                     <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                         <tr>
                         <td>
                             <p>We have a received an application,</p>
                             <p> ${args.name} has applied to become a seller. Below are ${args.name}'s details </p>
                             <p> Summary: <span class=""> ${args.summary} </span></p>
                             <p> Mobile: <span class=""> ${args.mobile} </span></p>
                         </td>
                         </tr>
                     </table>
                     </td>
                 </tr>

                 <!-- END MAIN CONTENT AREA -->
                 </table>
                 <!-- END CENTERED WHITE CONTAINER -->
             </div>
             </td>
             <td>&nbsp;</td>
         </tr>
         </table>
     </body>
       `
)

// Template email for user when we receive an application
const templateUser = (args) => (
    `
             <head>
         <meta name="viewport" content="width=device-width" />
         <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
         <title>Simple Transactional Email</title>
         <style>
         /* -------------------------------------
             GLOBAL RESETS
         ------------------------------------- */
         
         /*All the styling goes here*/
         
         img {
             border: none;
             -ms-interpolation-mode: bicubic;
             max-width: 100%; 
         }

         body {
             background-color: #f6f6f6;
             font-family: sans-serif;
             -webkit-font-smoothing: antialiased;
             font-size: 16px;
             line-height: 1.4;
             margin: 0;
             padding: 0;
             -ms-text-size-adjust: 100%;
             -webkit-text-size-adjust: 100%; 
         }

         table {
             border-collapse: separate;
             mso-table-lspace: 0pt;
             mso-table-rspace: 0pt;
             width: 100%; }
             table td {
             font-family: sans-serif;
             font-size: 16px;
             vertical-align: top; 
         }

         /* -------------------------------------
             BODY & CONTAINER
         ------------------------------------- */

         .body {
             background-color: #f6f6f6;
             width: 100%; 
         }

         /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
         .container {
             display: block;
             margin: 0 auto !important;
             /* makes it centered */
             max-width: 580px;
             padding: 10px;
             width: 580px; 
         }

         /* This should also be a block element, so that it will fill 100% of the .container */
         .content {
             box-sizing: border-box;
             display: block;
             margin: 0 auto;
             max-width: 580px;
             padding: 10px; 
         }

         /* -------------------------------------
             HEADER, FOOTER, MAIN
         ------------------------------------- */
         .main {
             background: #ffffff;
             border-radius: 3px;
             width: 100%; 
         }

         .wrapper {
             box-sizing: border-box;
             padding: 20px; 
         }

         .content-block {
             padding-bottom: 10px;
             padding-top: 10px;
         }

         .footer {
             clear: both;
             margin-top: 10px;
             text-align: center;
             width: 100%; 
         }
             .footer td,
             .footer p,
             .footer span,
             .footer a {
             color: #999999;
             font-size: 12px;
             text-align: center; 
         }

         /* -------------------------------------
             TYPOGRAPHY
         ------------------------------------- */
         h1,
         h2,
         h3,
         h4 {
             color: #000000;
             font-family: sans-serif;
             font-weight: 400;
             line-height: 1.4;
             margin: 0;
             margin-bottom: 30px; 
         }

         h1 {
             font-size: 35px;
             font-weight: 300;
             text-align: center;
             text-transform: capitalize; 
         }

         p,
         ul,
         ol {
             font-family: sans-serif;
             font-size: 18 px;
             font-weight: normal;
             margin: 0;
             margin-bottom: 15px; 
         }
             p li,
             ul li,
             ol li {
             list-style-position: inside;
             margin-left: 5px; 
         }

         a {
             color: #3498db;
             text-decoration: underline; 
         }

         /* -------------------------------------
             BUTTONS
         ------------------------------------- */
         .btn {
             box-sizing: border-box;
             width: 100%; }
             .btn > tbody > tr > td {
             padding-bottom: 15px; }
             .btn table {
             width: auto; 
         }
             .btn table td {
             background-color: #ffffff;
             border-radius: 5px;
             text-align: center; 
         }
             .btn a {
             background-color: #ffffff;
             border: solid 1px #3498db;
             border-radius: 5px;
             box-sizing: border-box;
             color: #3498db;
             cursor: pointer;
             display: inline-block;
             font-size: 14px;
             font-weight: bold;
             margin: 0;
             padding: 12px 25px;
             text-decoration: none;
             text-transform: capitalize; 
         }

         .btn-primary table td {
             background-color: #3498db; 
         }

         .btn-primary a {
             background-color: #3498db;
             border-color: #3498db;
             color: #ffffff; 
         }

         /* -------------------------------------
             OTHER STYLES THAT MIGHT BE USEFUL
         ------------------------------------- */
         .last {
             margin-bottom: 0; 
         }

         .first {
             margin-top: 0; 
         }

         .align-center {
             text-align: center; 
         }

         .align-right {
             text-align: right; 
         }

         .align-left {
             text-align: left; 
         }

         .clear {
             clear: both; 
         }

         .mt0 {
             margin-top: 0; 
         }

         .mb0 {
             margin-bottom: 0; 
         }

         .preheader {
             color: transparent;
             display: none;
             height: 0;
             max-height: 0;
             max-width: 0;
             opacity: 0;
             overflow: hidden;
             mso-hide: all;
             visibility: hidden;
             width: 0; 
         }

         .powered-by a {
             text-decoration: none; 
         }

         hr {
             border: 0;
             border-bottom: 1px solid #f6f6f6;
             margin: 20px 0; 
         }

         /* -------------------------------------
             RESPONSIVE AND MOBILE FRIENDLY STYLES
         ------------------------------------- */
         @media only screen and (max-width: 620px) {
             table[class=body] h1 {
             font-size: 28px !important;
             margin-bottom: 10px !important; 
             }
             table[class=body] p,
             table[class=body] ul,
             table[class=body] ol,
             table[class=body] td,
             table[class=body] span,
             table[class=body] a {
             font-size: 16px !important; 
             }
             table[class=body] .wrapper,
             table[class=body] .article {
             padding: 10px !important; 
             }
             table[class=body] .content {
             padding: 0 !important; 
             }
             table[class=body] .container {
             padding: 0 !important;
             width: 100% !important; 
             }
             table[class=body] .main {
             border-left-width: 0 !important;
             border-radius: 0 !important;
             border-right-width: 0 !important; 
             }
             table[class=body] .btn table {
             width: 100% !important; 
             }
             table[class=body] .btn a {
             width: 100% !important; 
             }
             table[class=body] .img-responsive {
             height: auto !important;
             max-width: 100% !important;
             width: auto !important; 
             }
         }
           
           .illustration{
            max-width: 360px;
            margin:auto !important;
            padding-bottom: 20px;
            display:block
           }

         /* -------------------------------------
             PRESERVE THESE STYLES IN THE HEAD
         ------------------------------------- */
         @media all {
             .ExternalClass {
             width: 100%; 
             }
             .ExternalClass,
             .ExternalClass p,
             .ExternalClass span,
             .ExternalClass font,
             .ExternalClass td,
             .ExternalClass div {
             line-height: 100%; 
             }
             .apple-link a {
             color: inherit !important;
             font-family: inherit !important;
             font-size: inherit !important;
             font-weight: inherit !important;
             line-height: inherit !important;
             text-decoration: none !important; 
             }
             #MessageViewBody a {
             color: inherit;
             text-decoration: none;
             font-size: inherit;
             font-family: inherit;
             font-weight: inherit;
             line-height: inherit;
             }
             .btn-primary table td:hover {
             background-color: #34495e !important;
             }
             .btn-primary a:hover {
             background-color: #34495e !important;
             border-color: #34495e !important; 
             }
             
         }

         </style>
     </head>
     <body class="">
         <span class="preheader">This is preheader text. Some clients will show this text as a preview.</span>
         <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
         <tr>
             <td>&nbsp;</td>
             <td class="container">
             <div class="content">

                 <!-- START CENTERED WHITE CONTAINER -->
                 <table role="presentation" class="main">

                 <!-- START MAIN CONTENT AREA -->
                 <tr>
                     <td class="wrapper">
                     <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                         <tr>
                         <td>
                           <img class ="illustration" src="https://res.cloudinary.com/lenx2222/image/upload/v1636925123/ezgif.com-gif-maker_1_ersysi.jpg" 
                               />
                             <h1>Thanks ${args.name}, we have received your application.</h1>
                             <p> Due to the large number of applications we are unable to accept all applicants, we will evaluate your brand and products - if there is a good fit we will let you know within 3 working days.  </p>
                         </td>
                         </tr>
                     </table>
                     </td>
                 </tr>

                 <!-- END MAIN CONTENT AREA -->
                 </table>
                 <!-- END CENTERED WHITE CONTAINER -->
             </div>
             </td>
             <td>&nbsp;</td>
         </tr>
         </table>
     </body>
       `
)


exports.send = async (req, res) => {

    console.log(req.body)

    try {
         const { ... args } = req.body

        if(!args.email){
         console.log("Email address not valid.")
           return res.status(500).json("Please enter a valid email address")
        }
        function validateEmail(email) 
        {
            var re = /\S+@\S+\.\S+/;
            return re.test(email);
        }

        if(!validateEmail(args.email)){
            console.log("Email address not valid.")
            return res.status(500).json("Email address not valid")
        }

        // Check whether the email has already applied, and prevent them from applying again if they already had.
        const existingApplication = await applyToBecomeSeller.find({email: args.email})

        if( !_.isEmpty(existingApplication)){
            console.log("You have already applied, please allow time and we will get back to you as soon as possible.")
            return res.status(500).json("You have already applied, please allow time and we will get back to you as soon as possible.")
        } else {
            const application = await applyToBecomeSeller.create(args)
                if(!application) {
                    res.status(500).json("Oops something went wrong pal, please try again later pal.")
                }
        }

        // Email sent to the applicant confirming their application
        const emailDataClient = {
          from: "victor@wabei.co.uk",
          to: args.email,
          subject: `We have received your application`,
          html: templateUser(args)
        };
        await sgMail.send(emailDataClient);
        // End of application

        //Email sent to admin, to notify that a brand has applied 
            const emailDataAdmin = {
          from: "victor@wabei.co.uk",
          to: "victor@wabei.co.uk",
          subject: `${args.name} has applied to become a seller`,
          html: templateAdmin(args)
        };
        await sgMail.send(emailDataAdmin);

        return res.status(200).json("You succesfully applied, check your inbox")
    
    } catch (error) {
        console.error(error);

        if (error.response) {
        console.error(error.response.body) 
    }
  }
}
0