import express, { application } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import nodemailer from 'nodemailer';
import multer from 'multer';
import path from 'path';

const app = express();
const port = 8081;

app.use('/uploads/uploads', express.static("uploads"));

app.use(express.json());
app.use(cors());
/*
const mongoURI = 'mongodb://localhost:27017/Placement';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error('Database connection error:', error));
db.once('open', () => console.log('Connected to MongoDB'));
*/


const mongoURI = 'mongodb+srv://sivakavindra:kvNzBLYa5x7K2lB2@placement.oxatc.mongodb.net/test?retryWrites=true&w=majority&appName=Placement';

mongoose.connect(mongoURI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((error) => console.error('Database connection error:', error));


const { Schema } = mongoose;

const academicDetailsSchema = new Schema({
    degree: { type: String, required: true },
    university: { type: String, required: true },
    graduationYear: { type: String, required: true },
    major: { type: String, required: true },
});

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    bio: { type: String },
    profilePicture: { type: String },
    academicDetails: [academicDetailsSchema],
});

const collection = mongoose.model('users', userSchema);

const jobSchema = new mongoose.Schema({
    title: { type: String },
    location: { type: String },
    type: { type: String }
});

const companySchema = new mongoose.Schema({
    name: { type: String, required: true },
    jobs: [jobSchema]
});

const Company = mongoose.model('Company', companySchema);

const createcompanySchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    ceo: { type: String, required: true },
});

const Companies = mongoose.model('Comp', createcompanySchema);

const placementofficeSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
});

const PlacementOfficer = mongoose.model('placementofficers', placementofficeSchema);

app.post('/get-main', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
        const company = await PlacementOfficer.findOne({ email: email.trim() });
        if (!company) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (company.password === password) {
            return res.status(200).json({
                message: 'exist',
                userId: company._id,
                role: 'placement',
                name: company.name,
            });
        } else {
            return res.status(401).json({ message: 'Incorrect password' });
        }
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/add-company', async (req, res) => {
    const { name, phone, email, ceo } = req.body;
    if (!name || !phone || !email || !ceo) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    try {
        const newCompany = new Company({ name, phone, email, password: "123", ceo });
        await newCompany.save();
        res.status(201).json({ message: 'Company added successfully', data: newCompany });
    } catch (error) {
        console.error('Error adding company:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post("/", async (req, res) => {
    const { email, password } = req.body;
    try {
        const check = await collection.findOne({ email: email });
        if (check) {
            if (check.password === password) {
                return res.json({
                    message: "exist",
                    name: check.name,
                    userId: check._id,
                    email: check.email,
                    role: check.role
                });
            } else {
                return res.json({ message: "fail" });
            }
        } else {
            return res.json({ message: "notexist" });
        }
    } catch (e) {
        console.error("Login error:", e);
        return res.json({ message: "error" });
    }
});

app.post('/get-company', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }
    try {
        const company = await Companies.findOne({ email });

        if (!company) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (company.password === password) {
            return res.status(200).json({
                message: 'exist',
                userId: company._id,
                role: 'company',
                name: company.name,
            });
        } else {
            return res.status(401).json({ message: 'Incorrect password' });
        }
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/signup', async (req, res) => {
    const { email, password, name, phone } = req.body;
    if (!name || !email || !password || !phone) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    const data = { email, password, name, phone };
    try {
        const existingUser = await collection.findOne({ email });
        if (existingUser) {
            return res.json("exist");
        } else {
            const newUser = new collection(data);
            await newUser.save();
            return res.json("notexist");
        }
    } catch (e) {
        console.error("Error during signup:", e);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.post('/send-confirmation', async (req, res) => {
    const { userEmail } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'sivakavindratamilselvan@gmail.com',
            pass: 'lvnbdnftzntovzuh',
        },
        debug: true,
        logger: true,
    });

    const mailOptions = {
        from: 'sivakavindratamilselvan@gmail.com',
        to: userEmail,
        subject: 'New SignUp',
        text: `Dear Student,

        Congratulations on successfully creating an account with our College Placement Portal! We are delighted to have you onboard as you embark on your journey toward securing exciting career opportunities.
        
        ### Here’s what you can do next:
        - **Explore Job Listings**: Browse through the available job opportunities tailored for students and fresh graduates.
        - **Update Your Profile**: Complete your profile by adding your academic details, achievements, and skills to make a great first impression with recruiters.
        - **Track Applications**: Keep an eye on the status of your job applications and stay updated on new interview schedules or offers.
        
        ### How to Get Started:
        1. Log in to your account using the email and password you registered with.
        2. Navigate through the dashboard to explore features and opportunities.
        3. For any assistance, feel free to reach out to our support team.
        
        We are here to support you every step of the way as you build your career. Best wishes for your future endeavors!
        
        Warm regards,  
        The College Placement Team  `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
});

app.post('/send-confirmation-applied', async (req, res) => {
    const { userEmail} = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'sivakavindratamilselvan@gmail.com',
            pass: 'lvnbdnftzntovzuh',
        },
        debug: true,
        logger: true,
    });

    const mailOptions = {
        from: 'sivakavindratamilselvan@gmail.com',
        to: userEmail,
        subject: 'Application Accepted',
        text: `Dear Applicant,

        We are excited to inform you that your application has been successfully received and accepted! Thank you for showing interest in this opportunity, and we greatly value the effort you’ve put into your application.
        
        What happens next?  
        Our recruitment team will carefully review your qualifications and experience to ensure alignment with the role requirements. Once the initial evaluation is complete, you will be notified regarding the next steps in the selection process, which may include assessments, interviews, or other interactions.  
        
        To help you stay prepared, here are some general tips:
        - Ensure that your contact information is up-to-date in case we need to reach you.
        - Keep an eye on your email inbox for updates or further instructions from us.
        - Begin researching the company and the role to better prepare for the upcoming steps.
        
        If you have any questions or need further clarification, please don’t hesitate to reach out to us at this email. We’re here to assist you throughout the process.
        
        Thank you for choosing to apply, and we wish you the very best of luck as you move forward!
        
        Warm regards,  
        The Recruitment Team`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
});

app.post('/send-confirmation-interview', async (req, res) => {
    const { userEmail, date, time } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'sivakavindratamilselvan@gmail.com',
            pass: 'lvnbdnftzntovzuh',
        },
        debug: true,
        logger: true,
    });

    const mailOptions = {
        from: 'sivakavindratamilselvan@gmail.com',
        to: userEmail,
        subject: 'Interview Scehdule',
        text: `
        Congratulations! We are pleased to inform you that your application has been shortlisted, and we are excited to move forward with your candidacy.

Your interview is scheduled as follows:
- **Date**: ${date}
- **Time**: ${time}

Please ensure that you are available for the interview and adequately prepared to discuss your qualifications, skills, and how you can contribute to the organization.  
If this is a virtual interview, the link and instructions will be shared with you soon. If it's in person, please arrive at the designated venue on time. 

Here are some tips to help you prepare:
1. Review the job requirements and your application materials.
2. Research the company and familiarize yourself with our vision and goals.
3. Be ready to discuss your experiences, strengths, and areas of expertise.
4. Prepare any questions you may have about the role or the organization.

We wish you the best of luck with the interview and are excited to learn more about you during the process. If you have any questions or need to reschedule, please don’t hesitate to contact us.

Looking forward to meeting you!

Best regards,  
The Recruitment Team` 
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
});

app.post('/send-confirmation-offered', async (req, res) => {
    const { userEmail, title, company } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'sivakavindratamilselvan@gmail.com',
            pass: 'lvnbdnftzntovzuh',
        },
        debug: true,
        logger: true,
    });

    const mailOptions = {
        from: 'sivakavindratamilselvan@gmail.com',
        to: userEmail,
        subject: 'Offer Accepted',
        text: `Dear Applicant,

We are thrilled to inform you that your application for the position of "${title}" at ${company} has been successfully accepted. Congratulations on your achievement!  

After careful review of your qualifications and performance during the selection process, we are confident that you will make a significant contribution to our team. We are excited to welcome you aboard and look forward to seeing the positive impact you will bring to ${company}.

To complete the onboarding process, please keep an eye on your email for further details and instructions. Should you have any questions or require any assistance, feel free to reach out to us.

Thank you for choosing ${company} as your next career step. We are excited to embark on this journey together and look forward to working with you!

Best regards,  
The Recruitment Team  
${company}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
});

app.post('/send-confirmation-rejected', async (req, res) => {
    const { userEmail, title, company } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'sivakavindratamilselvan@gmail.com',
            pass: 'lvnbdnftzntovzuh',
        },
        debug: true,
        logger: true,
    });

    const mailOptions = {
        from: 'sivakavindratamilselvan@gmail.com',
        to: userEmail,
        subject: 'Offer Rejected',
        text: `Dear Applicant,

        Thank you for taking the time to apply for the position of "${title}" at ${company}. 
        
        We regret to inform you that after careful consideration of your application and evaluation during the recruitment process, your offer for the mentioned position has been rejected. This decision was not an easy one, as we had a highly competitive pool of candidates, and many strong applications were received.
        
        We truly appreciate your interest in joining our team at ${company} and commend your efforts throughout the application process. While this opportunity did not work out, we encourage you to apply for other positions that may align with your skills and experience in the future.
        
        Thank you once again for considering ${company}. We wish you all the very best in your career pursuits and future endeavors.
        
        Sincerely,  
        The Recruitment Team  
        ${company}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
});

app.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    const user = await collection.findOne({ email: email });

    if (user) {
        const resetLink = `http://localhost:3000/reset-password?email=${email}`;

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: 'sivakavindratamilselvan@gmail.com',
                pass: 'lvnbdnftzntovzuh',
            },
        });

        const mailOptions = {
            from: 'sivakavindratamilselvan@gmail.com',
            to: email,
            subject: "Password Reset Link",
            text: `Hello,

We received a request to reset the password for your account. You can reset your password by clicking the link below:

http://localhost:3000/reset-password?email=sivakavindra@gmail.com

If you did not request this, please ignore this email.

Best regards,
Your Company Name
Click the following link to reset your password: ${resetLink}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: "Error sending email" });
            }
            res.json({ message: "emailSent" });
        });
    } else {
        res.json({ message: "emailNotFound" });
    }
});

app.post('/reset-password', async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const user = await collection.findOne({ email: email });
        if (user) {
            await collection.updateOne(
                { email: email },
                { $set: { password: newPassword } }
            );
            return res.json({ message: 'done' });
        } else {
            return res.json({ message: 'userNotFound' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/company', async (req, res) => {
    const { name, jobs } = req.body;
    if (!name || !jobs || !Array.isArray(jobs)) {
        return res.status(400).json({ message: 'Missing required fields for company or jobs' });
    }
    const companyData = { name, jobs };
    try {
        const newCompany = new Company(companyData);
        await newCompany.save();
        res.json({ message: 'Company created successfully', company: newCompany });
    } catch (error) {
        console.error('Error creating company:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/companies', async (req, res) => {
    try {
        const companies = await Company.find();
        res.json(companies);
    } catch (error) {
        console.error('Error fetching companies:', error);
        res.status(500).json({ message: 'Failed to fetch companies' });
    }
});

app.get('/api/placementapplied', async (req, res) => {
    try {
        const applications = await AppliedJob.find();
        if (!applications || applications.length === 0) {
            return res.status(404).json({ message: 'No applications found for this user' });
        }
        res.json(applications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ error: 'Error fetching applications' });
    }
});

app.get('/api/company/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const company = await Company.findById(id);
        if (company) {
            res.json(company);
        } else {
            res.status(404).json({ message: 'Company not found' });
        }
    } catch (error) {
        console.error('Error fetching company:', error);
        res.status(500).json({ message: 'Failed to fetch company' });
    }
});

app.put('/api/company/:id', async (req, res) => {
    const { id } = req.params;
    const { name, jobs } = req.body;
    try {
        const updatedCompany = await Company.findByIdAndUpdate(
            id,
            { name, jobs },
            { new: true }
        );
        if (updatedCompany) {
            res.json({ message: 'Company updated successfully', company: updatedCompany });
        } else {
            res.status(404).json({ message: 'Company not found' });
        }
    } catch (error) {
        console.error('Error updating company:', error);
        res.status(500).json({ message: 'Failed to update company' });
    }
});

app.delete('/api/company/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCompany = await Company.findByIdAndDelete(id);
        if (deletedCompany) {
            res.json({ message: 'Company deleted successfully' });
        } else {
            res.status(404).json({ message: 'Company not found' });
        }
    } catch (error) {
        console.error('Error deleting company:', error);
        res.status(500).json({ message: 'Failed to delete company' });
    }
});

app.get('/api/profile/:userId', async (req, res) => {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }
    try {
        const user = await collection.findById(userId);
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error('Error fetching user:', err);
        return res.status(500).json({ message: 'Server error' });
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const applicationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    companyname: { type: String, required: true },
    jobTitle: { type: String, required: true },
    status: { type: String, enum: ['Applied', 'Interview', 'Rejected', 'Offered', "Scheduled"], default: 'Applied' },
    phone: { type: String, required: true },
    resume: { type: String, required: true },
    schedule: {
        date: { type: String },
        time: { type: String },
        type: { type: String, enum: ['Offline', 'Online'], default: 'Offline' },
    },
}, { timestamps: true });

const AppliedJob = mongoose.model('AppliedJob', applicationSchema);

app.post('/api/apply', upload.single('resume'), async (req, res) => {
    const { userId, jobTitle, companyname, phone } = req.body;
    const resumePath = req.file ? req.file.path : '';
    if (!userId || !resumePath) {
        return res.status(400).json({ message: 'User ID and Resume are required' });
    }
    const data = {
        userId,
        jobTitle,
        companyname,
        phone,
        resume: resumePath,
        status: 'Applied'
    };

    try {
        const newApplication = new AppliedJob(data);
        await newApplication.save();
        res.json({ message: 'Application submitted successfully', application: newApplication });
    } catch (error) {
        console.error('Error applying for job:', error);
        res.status(500).json({ message: 'Failed to apply for job' });
    }
});

app.get('/api/applications', async (req, res) => {
    const { userId } = req.query;
    if (!userId) {
        return res.status(400).json({ error: 'UserId is required' });
    }

    try {
        const applications = await AppliedJob.find({ userId });

        if (!applications || applications.length === 0) {
            return res.status(404).json({ message: 'No applications found for this user' });
        }

        res.json(applications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ error: 'Error fetching applications' });
    }
});

app.get('/api/ownerapplications', async (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ error: 'UserId is required' });
    }
    try {
        const applications = await AppliedJob.find({ companyname: name.trim() });

        if (!applications || applications.length === 0) {
            return res.status(404).json({ message: 'No applications found for this user' });
        }

        res.json(applications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ error: 'Error fetching applications' });
    }
});

app.get('/api/userapplications', async (req, res) => {
    const { userId } = req.query;
    if (!userId) {
        return res.status(400).json({ error: 'UserId is required' });
    }
    try {
        const applications = await AppliedJob.find({ userId: userId });
        if (!applications || applications.length === 0) {
            return res.status(404).json({ message: 'No applications found for this user' });
        }
        res.json(applications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ error: 'Error fetching applications' });
    }
});

app.get('/api/appylyjob-comapany', async (req, res) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    try {
        const applications = await Company.find({ name: name.trim() });
        if (!applications || applications.length === 0) {
            return res.status(404).json({ message: 'No applications found for this user' });
        }

        res.json(applications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ error: 'Error fetching applications' });
    }
});

app.patch('/api/ownerapplica/:applicationId', async (req, res) => {
    try {
        const { status } = req.body;
        const { applicationId } = req.params;
        const updatedApplication = await AppliedJob.findByIdAndUpdate(applicationId, { status }, { new: true });
        res.json(updatedApplication);
    } catch (error) {
        res.status(500).send('Error updating application status');
    }
});

app.patch('/api/ownerapplications/:applicationId', async (req, res) => {
    try {
        const { status } = req.body;
        const { applicationId } = req.params;
        const updatedApplication = await AppliedJob.findByIdAndUpdate(applicationId, { status }, { new: true });
        res.json(updatedApplication);
    } catch (error) {
        res.status(500).send('Error updating application status');
    }
});

app.post('/api/jobs', async (req, res) => {
    const { companyName, title, location, type } = req.body;
    try {
        const company = await Company.findOne({ name: companyName });
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        const newJob = { title, location, type };
        company.jobs.push(newJob);
        await company.save();
        return res.status(200).json({ message: 'Job added successfully', company });
    } catch (error) {
        console.error('Error adding job:', error);
        return res.status(500).json({ message: 'Error adding job' });
    }
});

app.get('/api/get-user-email/:userId', async (req, res) => {
    const { userId } = req.params;
    if (!userId || userId.length !== 24) {
        return res.status(400).json({ error: 'Invalid or missing userId' });
    }
    try {
        const user = await collection.findOne({ _id: new mongoose.Types.ObjectId(userId) });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ email: user.email });
    } catch (error) {
        console.error('Error fetching user email:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

const jobApplicationSchema = new mongoose.Schema({
    userId: String,
    jobTitle: String,
    companyname: String,
    phone: String,
    status: String,
}, { timestamps: true });

const JobApplication = mongoose.model('appliedjobs', jobApplicationSchema);

app.get('/api/job-status', async (req, res) => {
    try {
        const jobApplications = await JobApplication.find();
        let statusCounts = {
            Offered: 0,
            Interviewed: 0,
            Scheduled: 0,
            Rejected: 0,
        };
        jobApplications.forEach((entry) => {
            if (statusCounts.hasOwnProperty(entry.status)) {
                statusCounts[entry.status]++;
            }
        });
        res.json(statusCounts);
    } catch (error) {
        console.error('Error fetching job status data:', error);
        res.status(500).send('Error fetching data');
    }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
