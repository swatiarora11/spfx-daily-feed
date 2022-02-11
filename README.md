# Spfx-Daily-feed Overview and Deployment Guide

**Spfx daily feed web part** is a solution based on SPFx web parts that appear inside a SharePoint page. This webpart can be used to send notifications in teams about the daily updates and keep the employees engaged and informed about the latest conversations. This webpart has the integration with the SharePoint List, populates the data on webpage based on the scheduled frequency.

Due to tight integration between SharePoint Online, Microsoft Teams, and Microsoft Viva Connections, admins can also use this webpart to customize and extend to all of these products. Currently, the deployment guide has the webpart hosted in Viva connections. It is  available in the Viva Connections Teams app on mobile, and will be available as a web part on desktop. 
The solution supports scenarios like daily updates, announcements, relevant news, thought of the day, corporate communication etc.

**Teams Notifications** Teams Activity Notifications can deliver a personalized feed to the employees with relevant information on sharepoint site from across their organization. The Feed automatically balances updated and engaging content with corporate communications to keep users interested, while also ensuring that they see the important messages. 

## Anatomy of the Webpart

The webpart reflects dynamic content that refreshes based on the updates on Sharepoint List. 

### **Title** Title of the Webpart
### **Picture Url** 
### **Admin UPN**
### **Select Group**
### **Teams App ID**
### **Select Sites**
### **Select List**
### **Send Feed**

## Deployment Guide

### Prerequisites 

To begin, you will need:

* An Office 365 account that has an active subscription of Sharepoint Online and Microsoft Teams.
* You will need to be a tenant administrator to be able to deploy this solution to the target tenant.
* Office 365 account(s) with administrative rights for Exchange Online, Sharepoint Online and Microsoft Teams workloads.
* A tenant App Catalog must have been created within the Apps option of the SharePoint Admin Center. Please see Set up your Office 365 tenant  and follow the Create app catalog site section. If your tenant-wide App Catalog has already been provisioned, you will need access to an account that has rights to upload a package to it to complete this setup process. Generally, this is an account with the SharePoint administrator role. If an account with that role does not work, go to the SharePoint admin center and find the Site Collection Administrators for the app catalog site collection and either log in as one of the Site Collection Administrators, or add the SharePoint administrator account that failed to the Site Collection Administrators. You will also need access to an account that is a SharePoint Tenant Admin.


## Steps for Deployment

### Configure SharePoint Online

### Step 1. Create  Viva connections site 
https://docs.microsoft.com/en-us/viva/connections/viva-connections-overview


### Step 2.Create SharePoint List
Open Site Contents on the Viva Connections Site and select New >> List. Select Blank List. Enter the name of the List as Chairman Speak.
Add the columns Title (Rename the Title column to Author), Live and Update in the list and select the type as shown below.

<p> <img src="sharepoint list-settings.png"/>

### Note: Do not create columns with name ID, Title, Created by and Modified by as they exist by default in the list.

<p> <img src="Sharepoint Site-list.png"/>

### Step 3 Upload the SPPKG file to Sharepoint app catalog
To download the SPPKG file, navigate to the customlearning.sppkg file in the webpart folder of this repository. Select Download to save the file to your computer.
The current solution is provided in it's packaged form in the web part folder customlearning.sppkg.

For uploading, Go to the Sharepoint admin center -> More features -> Apps -> App Catalog -> Apps for Sharepoint.
Upload this file into the app catalog by selecting upload, finding the file, and then selecting Deploy.

To validate the version of the web part installed in your tenant you must have access to the tenant-wide App Catalog. The custom learning solution will be installed there and you can verify the current version number against the version number noted above.

### Step 4 Grant API Permissions
Once the app package is uploaded, Navigate to API Access page in Sharepoint Admin center and approve the below permissions.

### Step 5: Create and Install Teams App
1.	Navigate to App registrations in Azure Portal and note the Application(client) ID of Sharepoint Online Client Extensibility Web application Principal.

2.	Download app.zip file from this git repository in teams folder and extract the same to a local folder.
3.	Change following fields in the manifest.json (What's this) to values appropriate for your organization.
o	developer.name (What's this?)
o	developer.websiteUrl
o	developer.privacyUrl
o	developer.termsOfUseUrl
4.	Change the id field under webApplicationInfo section in the manifest to Application (client) Id value from Step 1(Application ID Sharepoint Online Client Extensibility Web application Principal ) and save manifest.json file. 
5.	Create a ZIP package with manifest.json and app icon files (color.png and outline.png). Make sure that there are no nested folders within this ZIP package.
 
6.	Navigate to Microsoft Teams Admin Center. Under Teams apps > Manage apps section, click + Upload and upload ZIP package file created in the previous step. Once upload is complete, you will be able to see the Teams-Notification app under the Manage apps tab as shown below.

7.	Ensure that Custom App policy permission has been enabled under Permission Policies

8.	Now add this app to App Setup Policies, which in turn will make the app visible to all users in Microsoft Teams canvas. To add this for all users, select Global Policy.

9.	Now set the sequence to make the app visible to each user. We recommend to pin the app in the top 5, so that it is easily visible to end users on each client. Hit Save to make this change.


### Step 5 Publish the Webpart in the sharepoint site
Once the Sharepoint package file is uploaded to App catalog.
1.	Click the edit on the Sharepoint page
2.	Click Add a new section (+) on the left-hand side of the page, and then click One Column.
3.	Click +, then select DailyUpdate web part.


Click on Edit Webpart, fill in the description details and Republish.
