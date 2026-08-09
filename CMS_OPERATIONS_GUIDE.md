# Best Solution — CMS Operations Guide

> **Admin URL:** `https://astounding-souffle-666b84.netlify.app/admin/`
> **CMS System:** Decap CMS (Git-based, auto-publish)
> **Changes go live:** ~60 seconds after clicking "Publish"

---

## Table of Contents

1. [Logging In](#1-logging-in)
2. [Dashboard Overview](#2-dashboard-overview)
3. [How Editing Works](#3-how-editing-works)
4. [Uploading Images](#4-uploading-images)
5. [Content Collections Reference](#5-content-collections-reference)
   - [Hero Slides](#51-hero-slides)
   - [Stats](#52-stats)
   - [Marquee](#53-marquee-ticker)
   - [Why Us](#54-why-us)
   - [Facilities](#55-facilities)
   - [Homepage Courses](#56-homepage-courses)
   - [Courses (Full)](#57-courses-full)
   - [Faculty](#58-faculty)
   - [Timetable](#59-timetable)
   - [Fees](#510-fees)
   - [Admissions](#511-admissions)
   - [Testimonials](#512-testimonials)
   - [Results](#513-results)
   - [Blog](#514-blog)
   - [Contact](#515-contact)
   - [Brochure](#516-brochure)
   - [About](#517-about)
   - [Instagram Gallery](#518-instagram-gallery)
   - [Site Settings](#519-site-settings)
6. [Common Tasks (Step-by-Step)](#6-common-tasks-step-by-step)
7. [Important Rules and Warnings](#7-important-rules-and-warnings)
8. [Troubleshooting](#8-troubleshooting)

---

## 1. Logging In

1. Open your browser and go to your admin URL:
   ```
   https://astounding-souffle-666b84.netlify.app/admin/
   ```
2. Click **"Login with Netlify Identity"**
3. Enter your **email** and **password** (the one you set from the invitation email)
4. You will be taken to the CMS Dashboard

> **Forgot password?** Click "Forgot password" on the login screen. You'll receive a reset link via email.

---

## 2. Dashboard Overview

After logging in, you'll see a **left sidebar** with all the content sections (called "Collections"). Each collection maps to a specific part of the website:

| Sidebar Item | What it controls on the website |
|---|---|
| Hero Slides | The big banner slider on the homepage |
| Stats | Counter numbers (e.g., "3800+ Students Trained") |
| Marquee | The scrolling ticker text on the homepage |
| Why Us | "Why Best Solution?" feature cards |
| Facilities | Campus facilities icons row |
| Homepage Courses | Course preview cards on homepage |
| Courses (Full) | The full `/courses` page with all program details |
| Faculty | All teacher profiles on the `/faculty` page |
| Timetable | Batch schedule table on the `/timetable` page |
| Fees | Fee structure table on the `/fees` page |
| Admissions | Steps, documents, and dates on the `/admissions` page |
| Testimonials | Student reviews on the `/testimonials` page |
| Results | JEE and NEET result photos on the `/results` page |
| Blog | Blog posts on the `/blog` page |
| Contact | Address, phone, email, map on the `/contact` page |
| Brochure | The downloadable brochure section on homepage |
| About | Values and timeline on the `/about` page |
| Instagram Gallery | Instagram posts on homepage + `/gallery` page |
| Site Settings | Global settings (phone, logo, session year, form options) |

---

## 3. How Editing & Publishing Works (Credit-Saving Workflow)

### The Credit-Saving Batched Workflow

To save your Netlify build minutes and avoid exhausting your plan, automatic builds on every minor edit are disabled. You can make as many edits as you want throughout the day without using any build credits!

```
1. Click a collection in the sidebar (e.g., "Faculty", "Fees", "Blog")
2. Click the file name that appears
3. Make your changes and click the blue "Save" button inside the CMS
   -> Your changes are saved directly to GitHub (0 build minutes consumed!)
4. Repeat for any other pages or blogs you want to edit today
5. When ALL edits are complete, click the top-right button:
   [ 🚀 Publish All Changes Live ]
6. Netlify builds once and deploys all changes together (only 1 build minute used!)
```

### Anti-Spam Cooldown Timer (3 Minutes)

After clicking **"🚀 Publish All Changes Live"**, the button will show:
`⏳ Deploying... (2m 45s remaining)`

* This 3-minute timer ensures Netlify has adequate time to compile and publish your updates without getting spammed by multiple simultaneous builds.
* The timer persists across page refreshes. Once the 3 minutes complete, the button becomes active again for your next deployment.

---

### One-Time Netlify Setup (If not already configured)

1. **Stop Auto-Builds:**
   * Go to **Netlify Dashboard** → Your Site → **Site Configuration** → **Build & deploy** → **Continuous deployment**
   * Under **Build status**, click **Stop builds**.
2. **Create Build Hook:**
   * Under **Build & deploy**, scroll to **Build hooks** → click **Add build hook**.
   * Name: `CMS Admin Deploy` · Branch: `main` → click **Save**.
   * Copy the generated webhook URL.
3. **Add Environment Variable:**
   * Go to **Site Configuration** → **Environment variables** → **Add a variable**.
   * Key: `NETLIFY_BUILD_HOOK_URL`
   * Value: *(paste your webhook URL)*

### Understanding Field Types

| Field Type | What it looks like | How to use it |
|---|---|---|
| **String** | Single-line text input | Type short text (names, titles, labels) |
| **Text** | Multi-line text area | Type longer text (descriptions, quotes) |
| **Number** | Number input | Type a number |
| **Image** | Upload button | Click to upload or select an existing image |
| **Select** | Dropdown menu | Pick one option from the list |
| **Color** | Color picker | Click to choose a color |
| **Boolean** | Toggle switch | ON or OFF |
| **List** | Expandable list | Click "Add" to add items, drag to reorder |
| **Object** | Group of fields | A set of related fields grouped together |

### Adding a New Item to a List

Many sections (like Faculty, Blog, Timetable) use **lists**. To add a new item:

1. Scroll down to the list section
2. Click the **"Add [Item Name]"** button at the bottom of the list
3. A new blank form appears — fill in all the fields
4. Click **"Publish"** to save

### Removing an Item from a List

1. Find the item in the list
2. Click the **"x"** (delete) icon on the right side of the item
3. Click **"Publish"** to save the deletion

### Reordering Items in a List

1. Hover over the item you want to move
2. Click and **drag** using the handle icon on the left
3. Drop it in the new position
4. Click **"Publish"** to save

---

## 4. Uploading Images

### How to Upload a New Image

1. Click on any **Image** field
2. A media library popup opens
3. Click **"Upload"** in the top-right corner
4. Select an image from your computer
5. The image is uploaded and automatically selected
6. Click **"Publish"** to save

### Image Guidelines

| Rule | Details |
|---|---|
| **Format** | Use `.jpg`, `.png`, or `.webp` |
| **Size** | Keep images under **2 MB** for fast loading |
| **Result photos** | Use portrait orientation (3:4 ratio works best) |
| **Instagram posts** | Square images work best |
| **Logo** | Use a `.png` with transparent background |
| **Brochure** | Portrait orientation pamphlet image |

### Where Images Are Stored

All uploaded images go to the `public/images/` folder in the website's repository. You can organize them into subfolders by uploading to specific paths:
- Result photos: `/images/results/`
- Instagram posts: `/images/instagram/`
- General images: `/images/`

---

## 5. Content Collections Reference

### 5.1 Hero Slides

**What it controls:** The large banner slider at the top of the homepage.

**Fields per slide:**

| Field | What to enter | Example |
|---|---|---|
| **Eyebrow** | Small text above the title | `Since 2001 . Indore` |
| **Title** | Main headline (each line is separate) | Line 1: `Best Solution` / Line 2: `The Launchpad.` |
| **Body** | Description paragraph below the title | `Indore's most trusted coaching for IIT-JEE...` |
| **Primary CTA - Label** | Main button text | `Explore Courses` |
| **Primary CTA - Href** | Button link URL | `/courses` |
| **Secondary CTA - Label** | Second button text | `Book a Free Demo` |
| **Secondary CTA - Href** | Button link URL | `/admissions` |
| **Image** | Background image for the slide | Upload a wide banner image |
| **Stat - Value** | A highlight number | `99.48` |
| **Stat - Label** | What the number represents | `Top %ile JEE 2023` |

**Example — Adding a new hero slide:**
1. Click **Hero Slides** then **Hero Content**
2. Scroll to the **Slides** list
3. Click **"Add Slides"**
4. Fill in: Eyebrow = `New Batch . August 2026`, Title Line 1 = `Admissions Open Now`, Body = `Join the winning team...`
5. Set buttons and upload a banner image
6. Click **Publish**

---

### 5.2 Stats

**What it controls:** The counter numbers on the homepage (e.g., "3800+ Students Trained").

**Fields per stat:**

| Field | Example |
|---|---|
| **Value** | `3800+` |
| **Label** | `Students Trained` |

**To update a stat:** Just change the Value or Label text and click Publish.

---

### 5.3 Marquee (Ticker)

**What it controls:** The horizontally scrolling text strip on the homepage.

**Fields:** A simple list of text strings.

**Example items:**
- `Admissions Open 2026-27`
- `99.48 %ile JEE Mains`
- `Free Career Counselling`

**To add a new ticker item:** Click "Add Items", type your text, then Publish.

---

### 5.4 Why Us

**What it controls:** The "Why Best Solution?" feature cards on the homepage.

**Fields per card:**

| Field | How to fill it |
|---|---|
| **Icon** | Select from dropdown: `Trophy`, `Users`, `Target`, `ClipboardCheck`, `Award`, `Sparkles` |
| **Title** | Card heading, e.g., `22+ Years of Excellence` |
| **Description** | Card detail text, e.g., `Since 2001, we've been shaping JEE and NEET toppers...` |

---

### 5.5 Facilities

**What it controls:** The facilities icons row on the homepage.

**Fields per facility:**

| Field | How to fill it |
|---|---|
| **Icon** | Select from: `Presentation`, `BookOpen`, `House`, `Bus`, `Coffee`, `Utensils` |
| **Title** | Facility name, e.g., `Smart Classrooms` |

---

### 5.6 Homepage Courses

**What it controls:** The course preview cards on the homepage.

**Fields per course:**

| Field | Example |
|---|---|
| **Slug** | `iit-jee` (used internally, keep lowercase with dashes) |
| **Grade** | `Class 11 - 12 + Droppers` |
| **Title** | `IIT-JEE (Main + Advanced)` |
| **Tagline** | `Rank-focused. Concept-first.` |
| **Subjects** | List: `Physics`, `Chemistry`, `Mathematics` |
| **Price** | `From Rs.75,000 / year` |
| **Color** | Pick a card accent color |
| **Span** | Number (keep as `8` for standard width) |

---

### 5.7 Courses (Full)

**What it controls:** The detailed course listing at `/courses`.

**Fields per program:**

| Field | Example |
|---|---|
| **Slug** | `iit-jee` |
| **Grade** | `Class 11 - 12 + Droppers . 1 - 2 Year Program` |
| **Title** | `IIT-JEE (Main + Advanced)` |
| **Tagline** | `Rank-focused. Concept-first.` |
| **Subjects** | List of subjects taught |
| **Features** | List of program features/USPs |
| **Fee** | `From Rs.75,000 / year` |
| **Color** | Primary card color |
| **Color Dark** | Darker shade of the same color (for hover/gradient) |
| **Enroll Label** | Enrollment button text, e.g., `Enroll in IIT-JEE` |
| **Enroll Href** | Button link, typically `/admissions` |

---

### 5.8 Faculty

**What it controls:** Teacher profiles on the `/faculty` page.

**Fields per member:**

| Field | Example |
|---|---|
| **Category** | `PHYSICS` or `MATHEMATICS` or `BIOLOGY (NEET)` |
| **Name** | `Dr. Ajay Sharma` |
| **Qualification** | `IIT Roorkee, ex-Allen` |
| **Experience** | `14+ yrs experience` |
| **Initials** | `AS` (first letters of name) |
| **BgColor** | Tailwind CSS class like `bg-slate-300`, `bg-blue-100`, `bg-amber-100` |
| **Highlight** | Toggle ON to visually highlight this faculty member |

**Example — Adding a new faculty member:**
1. Click **Faculty** then **Faculty**
2. Click **"Add Members"**
3. Fill in: Category = `CHEMISTRY`, Name = `Dr. Ravi Kumar`, Qualification = `PhD IIT Delhi`, Experience = `8+ yrs experience`, Initials = `RK`, BgColor = `bg-green-100`, Highlight = OFF
4. Click **Publish**

**BgColor values you can use:** `bg-slate-300`, `bg-blue-100`, `bg-amber-100`, `bg-emerald-100`, `bg-violet-100`, `bg-rose-100`, `bg-cyan-100`, `bg-pink-100`, `bg-green-100`, `bg-orange-100`

---

### 5.9 Timetable

**What it controls:** The batch schedule table on the `/timetable` page.

**Fields per batch:**

| Field | Example |
|---|---|
| **Batch** | `JEE Advanced — Grade 12` |
| **Days** | `Mon — Sat` |
| **Time** | `6:00 AM - 9:30 AM` |
| **Room** | `Hall A` |

**Example — Adding a new batch:**
1. Click **Timetable** then **Timetable**
2. Click **"Add Batches"**
3. Fill in: Batch = `Foundation — Grade 9`, Days = `Mon, Wed, Fri`, Time = `4:00 PM - 6:00 PM`, Room = `Hall F`
4. Click **Publish**

---

### 5.10 Fees

**What it controls:** The fee structure table on the `/fees` page.

**Top-level fields:**

| Field | Example |
|---|---|
| **Session Year** | `2026-27` |
| **Note** | Footnote text below the table |

**Fields per fee row:**

| Field | Example |
|---|---|
| **Program** | `IIT-JEE (Main + Adv)` |
| **Registration** | `Rs.2,000` |
| **Tuition** | `Rs.75,000` |
| **Installments** | `3 x Rs.25,000` |
| **Scholarship** | `Up to 90%` |

**Example — Updating fees for next session:**
1. Click **Fees** then **Fees**
2. Change **Session Year** to `2027-28`
3. Update the tuition amounts in each row
4. Update the **Note** if needed
5. Click **Publish**

---

### 5.11 Admissions

**What it controls:** The admissions process page at `/admissions`.

**Top-level fields:**

| Field | Example |
|---|---|
| **Session Year** | `2026-27` |

**Steps list — Fields per step:**

| Field | Example |
|---|---|
| **ID** | `01` (step number) |
| **Label** | `STEP 1` |
| **Title** | `Fill the enquiry form` |
| **Description** | `Share your class, target exam, and preferred batch.` |
| **Icon** | `ClipboardList` (icon name — do not change unless you know the icon names) |

**Documents list:** Simple text items like `Photo ID (Aadhaar / school ID)`.

**Key Dates:**

| Field | Example |
|---|---|
| **Registration Opens** | `15 Jan 2026` |
| **Scholarship Test** | `Every 2nd Sunday` |
| **Batch Commences** | `01 Apr 2026` |

---

### 5.12 Testimonials

**What it controls:** Student reviews on the `/testimonials` page and homepage testimonials section.

**Fields per testimonial:**

| Field | Example |
|---|---|
| **Name** | `Srujan Patel` |
| **Tag** | `JEE Advanced 2025 . AIR 1833` |
| **Quote** | `The doubt sessions were a game-changer...` |
| **Initials** | `SP` (shown when no photo) |
| **Image** | (Optional) Upload a student photo |

**Example — Adding a new testimonial:**
1. Click **Testimonials** then **Testimonials**
2. Click **"Add Testimonials"**
3. Fill in: Name = `Priya Singh`, Tag = `NEET 2026 . 680/720`, Quote = `Best Solution made NEET preparation systematic and stress-free...`, Initials = `PS`
4. Optionally upload a photo
5. Click **Publish**

> **Note:** If no photo is uploaded, the website automatically shows the student's initials in a colored circle.

---

### 5.13 Results

**What it controls:** The JEE and NEET result photos on the `/results` page and homepage results section.

**Fields:**

| Section | What to do |
|---|---|
| **JEE** | A list of images. Each item is one student's result card photo. |
| **NEET** | Same — a list of NEET result card photos. |
| **Stats** | The stats shown at the top (e.g., `3800+` / `Students Trained`) |

**Example — Adding a new JEE result photo:**
1. Click **Results** then **Results**
2. In the **JEE** section, click **"Add JEE"**
3. Click the image field and upload the student's result card photo
4. Click **Publish**

**Example — Updating the stats after new results come out:**
1. Find the **Stats** section
2. Change the values (e.g., update `99.48` to `99.72` for the new top percentile)
3. Click **Publish**

---

### 5.14 Blog

**What it controls:** Blog posts on the `/blog` page.

**Fields per post:**

| Field | Example |
|---|---|
| **ID** | `7` (unique number — increment from the last post) |
| **Title** | `How to Manage Board Exams + JEE Prep Simultaneously` |
| **Snippet** | A 2-3 sentence summary of the article |
| **Category** | Select from: `IIT-JEE`, `NEET`, `CCG`, `OLYMPIAD`, `BOARDS`, `WELLNESS` |
| **Date** | `Aug 2026` |
| **Read Time** | `5 MIN` |
| **BgColor** | Pick a color for the card header area |

**Example — Adding a new blog post:**
1. Click **Blog** then **Blog**
2. Click **"Add Posts"**
3. Fill in: ID = `7`, Title = `Top 10 Physics Tricks for JEE Mains`, Snippet = `Master these shortcut methods...`, Category = `IIT-JEE`, Date = `Aug 2026`, Read Time = `6 MIN`
4. Pick a background color
5. Click **Publish**

---

### 5.15 Contact

**What it controls:** Contact information on the `/contact` page, footer, and navbar.

**Fields:**

| Field | Example |
|---|---|
| **Address** | `18/19 Sayaji Square, Near Hotel Park, Vijay Nagar, Indore (M.P.)` |
| **Phones** | List: `94259 59956`, `0731-4088896` |
| **Email** | `info@bestsolutionindore.com` |
| **Instagram - Handle** | `@bestsolutionindore` |
| **Instagram - URL** | `https://instagram.com/bestsolutionindore` |
| **Map Embed** | The Google Maps iframe `src` URL |
| **Map Address** | `Sayaji Square, Scheme No 54, Vijay Nagar, Indore, M.P. 452010` |

> **To change the phone number:** Update it here in Contact AND in Site Settings (see 5.19).

---

### 5.16 Brochure

**What it controls:** The brochure download section on the homepage.

**Fields:**

| Field | Example |
|---|---|
| **Session Label** | `New . July 2026` |
| **Image** | Upload the brochure/pamphlet image |
| **Description** | `Everything you need to know — courses, fees, timetable...` |

**To update the brochure for a new session:**
1. Click **Brochure** then **Brochure**
2. Change **Session Label** to `New . January 2027`
3. Upload the new pamphlet image
4. Update the description if needed
5. Click **Publish**

---

### 5.17 About

**What it controls:** The About page (`/about`) — values cards and timeline milestones.

**Values — Fields per value:**

| Field | Example |
|---|---|
| **Icon** | Icon name like `Lightbulb`, `Heart`, `Shield` |
| **Title** | `Innovation in Teaching` |
| **Description** | `We blend traditional methods with technology...` |

**Timeline — Fields per milestone:**

| Field | Example |
|---|---|
| **Year** | `2001` |
| **Title** | `Founded in Indore` |
| **Description** | `Started with 12 students and a single classroom.` |

**Example — Adding a new timeline milestone:**
1. Click **About** then **About**
2. Scroll to the **Timeline** section
3. Click **"Add Timeline"**
4. Fill in: Year = `2026`, Title = `25th Anniversary`, Description = `Celebrating a quarter century of academic excellence.`
5. Click **Publish**

---

### 5.18 Instagram Gallery

**What it controls:** Instagram posts on the homepage section + the `/gallery` page.

**Top-level fields:**

| Field | Example |
|---|---|
| **Section Title** | `Follow Us on Instagram` |
| **Handle** | `@bestsolutionindore` |
| **Profile URL** | `https://instagram.com/bestsolutionindore` |

**Posts — Fields per post:**

| Field | Example |
|---|---|
| **Image** | Upload a screenshot/save of the Instagram post |
| **Caption** | `JEE Advanced 2026 — Our warriors aced it again!` |
| **Instagram URL** | `https://www.instagram.com/p/ABC123/` (the link to the actual Instagram post) |
| **Date** | `2026-07-15` (format: YYYY-MM-DD) |
| **Featured on Homepage** | Toggle ON = shows on homepage; OFF = only on gallery page |

**Example — Adding a new Instagram post:**
1. Click **Instagram Gallery** then **Instagram Gallery**
2. Scroll to the **Posts** section
3. Click **"Add Posts"**
4. **Upload the image:** Save the image from Instagram, then upload it here
5. **Paste the caption:** Copy the caption from Instagram
6. **Paste the URL:** Right-click the post on Instagram, select "Copy Link", then paste here
7. **Set the date:** Enter in `YYYY-MM-DD` format, e.g., `2026-08-08`
8. **Featured on Homepage:** Toggle ON if you want this post to appear on the homepage (max 6 featured posts show)
9. Click **Publish**

**How to get the Instagram post URL:**
1. Open the post on Instagram (web or app)
2. Click the three dots menu
3. Click **"Copy Link"**
4. Paste it into the **Instagram URL** field

---

### 5.19 Site Settings

**What it controls:** Global settings used across the entire website — navbar phone, logo, enquiry form options.

**Fields:**

| Field | Example | Where it appears |
|---|---|---|
| **Phone** | `94259 59956` | Navbar, footer |
| **Phone Link** | `tel:+919425959956` | The clickable phone link (must start with `tel:+91`) |
| **Session Year** | `2026-27` | Various places across the site |
| **Logo** | Upload logo image | Navbar, footer |
| **Grade Options** | List: `Class 6`, `Class 7`, ..., `Dropper` | Enquiry form dropdown |
| **Course Options** | List: `IIT-JEE (Main + Advanced)`, `NEET (Medical)`, ... | Enquiry form dropdown |

**Example — Updating phone number:**
1. Click **Site Settings** then **Settings**
2. Change **Phone** to the new number, e.g., `98765 43210`
3. Change **Phone Link** to `tel:+919876543210`
4. Click **Publish**
5. IMPORTANT: **Also update the phone in Contact** (section 5.15) to keep things consistent!

**Example — Adding a new grade option to the enquiry form:**
1. Click **Site Settings** then **Settings**
2. Scroll to **Grade Options**
3. Click **"Add Grade Options"**
4. Type `Class 5`
5. Drag it to the correct position in the list
6. Click **Publish**

---

## 6. Common Tasks (Step-by-Step)

### Task 1: Update fees for the new session

1. Go to **Fees** then **Fees**
2. Change **Session Year** from `2026-27` to `2027-28`
3. Update each fee row's amounts
4. Update the **Note** if any scholarship rules changed
5. Click **Publish**
6. Go to **Site Settings** and update **Session Year** to `2027-28`
7. Click **Publish**
8. Go to **Admissions** and update **Session Year** to `2027-28`
9. Update the **Key Dates** with new dates
10. Click **Publish**

### Task 2: Add new JEE/NEET results after exams

1. Go to **Results** then **Results**
2. In the **JEE** section (or **NEET**), click **"Add"**
3. Upload the student's result card photo
4. Repeat for each student
5. Update the **Stats** section with new numbers
6. Click **Publish**

### Task 3: Add a new Instagram post

1. Save the image from Instagram to your computer
2. Go to **Instagram Gallery** then **Instagram Gallery**
3. Click **"Add Posts"**
4. Upload the saved image
5. Copy-paste the caption from Instagram
6. Copy-paste the post URL
7. Enter the date in `YYYY-MM-DD` format
8. Toggle **"Featured on Homepage"** ON if you want it on the homepage
9. Click **Publish**

### Task 4: Change the phone number everywhere

1. Go to **Site Settings** and change **Phone** and **Phone Link**
2. Click **Publish**
3. Go to **Contact** and change the phone in the **Phones** list
4. Click **Publish**

### Task 5: Add a new faculty member

1. Go to **Faculty** then **Faculty**
2. Click **"Add Members"**
3. Fill in all fields (see section 5.8 for details)
4. Click **Publish**

### Task 6: Update the timetable for a new session

1. Go to **Timetable** then **Timetable**
2. Edit existing batches (change times, rooms, days)
3. Or click **"Add Batches"** to add new ones
4. Delete old batches by clicking the **x** icon
5. Click **Publish**

### Task 7: Upload a new brochure

1. Go to **Brochure** then **Brochure**
2. Change **Session Label** to the new session
3. Click the image field and upload the new brochure image
4. Update the description if needed
5. Click **Publish**

---

## 7. Important Rules and Warnings

### Do NOT change these fields (unless you know what you're doing)

| Field | Why |
|---|---|
| **Slug** (in Courses) | Used in URLs — changing it will break links |
| **Icon** fields | These map to specific code icons — only use the allowed values |
| **BgColor** (in Faculty) | Must be a valid Tailwind CSS class like `bg-blue-100` |
| **Phone Link** (in Settings) | Must follow `tel:+91XXXXXXXXXX` format exactly |

### Safe to change anytime

| Field | Notes |
|---|---|
| Any text (names, descriptions, quotes) | Change freely |
| Numbers and prices | Change freely |
| Images | Upload new ones anytime |
| Dates | Change freely |
| List order | Drag and drop to reorder |

### Things to remember

1. **Always click "Publish"** after making changes. If you close the browser without publishing, your changes are lost.
2. **Changes take ~60 seconds** to appear on the live website after publishing.
3. **Keep image sizes small** (under 2 MB). Large images slow down the website.
4. **Do not delete all items** from a list — always keep at least one. Deleting all items may cause the page to break.
5. **Session Year appears in multiple places.** When updating for a new session, update it in: Fees, Admissions, and Site Settings.
6. **Phone number appears in multiple places.** Update it in both Site Settings and Contact.

---

## 8. Troubleshooting

### "I can't log in"

- Make sure you're using the correct email that received the invitation
- Click "Forgot password" to reset
- Make sure you're going to the `/admin/` URL (with the trailing slash)

### "My changes aren't showing on the website"

- Wait at least 60 seconds after clicking Publish
- Hard-refresh your browser: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Check that you actually clicked the blue **"Publish"** button

### "I accidentally deleted something"

- Don't panic! All changes are tracked in Git
- Contact your developer — they can revert any change from the Git history

### "The image isn't showing"

- Make sure the image was fully uploaded (you should see a preview)
- Check that the image file is under 2 MB
- Try re-uploading the image

### "The website looks broken after my change"

- Go back to the CMS and undo your last change
- Click **Publish** to revert
- If you can't fix it, contact your developer

### "I want to add a new page to the website"

- The CMS can only edit **existing content** on existing pages
- Adding entirely new pages requires developer help
- Contact your developer for new pages or structural changes

---

> **Need help?** Contact your development team for any issues not covered in this guide.
