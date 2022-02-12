# SPFx Updates Webpart - Overview and Deployment Guide

**SPFx Updates Webpart** is a client side web part built using Sharepoint Framework (SPFx). This webpart has integration with a sharepoint list to pull prefed updates and display them on given dates. This webpart can also be used by admins to send activity feed in teams to keep the employees engaged and informed about the latest updates.

The webpart leverages the tight integration between SharePoint Online and Microsoft Teams to support scenarios like daily updates, announcements, relevant news, thought of the day, corporate communication etc.

## Prerequisites 

To begin, you will need:

* An active subscription of Sharepoint Online and Microsoft Teams.
* Office 365 account(s) with administrative rights for Sharepoint Online and Microsoft Teams workloads.

## Anatomy of Webpart

An overview snapshot of the **SPFx Updates Webpart** highlighting its major sections is shown in the below figure. 

<p> <img src="screenshots/webpart overview.png"/>

Let us dive into few details to understand configuration of this webpart and how it controls the content being shown in various sections of the webpart. Each webpart section and corresponding fields of property pane configuration which affect webpart presentation and functionality is explained below.

1. **Picture** - sourced from the url provided in the **Picture Url** field of webpart property pane
2. **Title** - sourced from the text entered in the **Title** field of webpart property pane
3. **Sub Title** - sourced from the shrepoint list provided using **Select sites** and **Select a list** fields of webpart property pane
4. **Description** - sourced from the shrepoint list provided using **Select sites** and **Select a list** fields of webpart property pane
5. **Send Feed Button** - 
    * enabled only for the user whose UPN is filled in **Admin UPN** field of webpart property pane
    * On click of the **Send Feed Button**, webpart sends teams activity feed to members of the O365 group selected in the **Select Group** field of webpart property pane
    * activity feed will be successfully sent only if Teams application with App ID filled in the **Teams App ID** field of webpart property pane is installed in user's personal scope.

All the mappings of webpart sections to corresponding configuration fields are summarized in the snapshot below.
<p> <img src="screenshots/webpart anatomy.jpeg"/>

## Deployment Guide

### Configure SharePoint Online

#### Step 1. Create  Viva connections site 
https://docs.microsoft.com/en-us/viva/connections/viva-connections-overview

#### Step 2.Create SharePoint List
Open Site Contents on the Viva Connections Site and select New >> List. Select Blank List. Enter the name of the List as Chairman Speak.
Add the columns Title (Rename the Title column to Author), Live and Update in the list and select the type as shown below.

<p> <img src="screenshots/sharepoint list-settings.png"/>

**Note:** Do not create columns with name ID, Title, Created by and Modified by as they exist by default in the list.

<p> <img src="screenshots/Sharepoint Site-list.png"/>

#### Step 3 Upload the SPPKG file to Sharepoint app catalog
To download the SPPKG file, navigate to the customlearning.sppkg file in the webpart folder of this repository. Select Download to save the file to your computer.
The current solution is provided in it's packaged form in the web part folder ***customlearning***.sppkg.

For uploading, Go to the Sharepoint admin center -> More features -> Apps -> App Catalog -> Apps for Sharepoint.
Upload this file into the app catalog by selecting upload, finding the file, and then selecting Deploy.

<p> <img src="screenshots/App catalog-sharepoint.png"/>

To validate the version of the web part installed in your tenant you must have access to the tenant-wide App Catalog. The custom learning solution will be installed there and you can verify the current version number against the version number noted above.

#### Step 4 Grant API Permissions
Once the app package is uploaded, Navigate to API Access page in Sharepoint Admin center and approve the below permissions.

<p> <img src="screenshots/API Access in SP.png"/>

#### Step 5: Create and Install Teams App
1.	Navigate to App registrations in Azure Portal and note the Application(client) ID of Sharepoint Online Client Extensibility Web application Principal.

<p> <img src="screenshots/Azureportal, webapplicationid.png"/>

2.	Download app.zip file from this git repository in teams folder and extract the same to a local folder.
3.	Change following fields in the manifest.json (What's this) to values appropriate for your organization.
o	developer.name (What's this?)
o	developer.websiteUrl
o	developer.privacyUrl
o	developer.termsOfUseUrl
4.	Change the id field under webApplicationInfo section in the manifest to Application (client) Id value from Step 1(Application ID Sharepoint Online Client Extensibility Web application Principal ) and save manifest.json file. 
5.	Create a ZIP package with manifest.json and app icon files (color.png and outline.png). Make sure that there are no nested folders within this ZIP package.
 
6.	Navigate to Microsoft Teams Admin Center. Under Teams apps > Manage apps section, click + Upload and upload ZIP package file created in the previous step. Once upload is complete, you will be able to see the Teams-Notification app under the Manage apps tab as shown below.

<p> <img src="screenshots/manage teams-teams admin center.png"/>

7.	Ensure that Custom App policy permission has been enabled under Permission Policies

8.	Now add this app to App Setup Policies, which in turn will make the app visible to all users in Microsoft Teams canvas. To add this for all users, select Global Policy.
<p> <img src="screenshots/App setup policy-teams admin center.png"/>

9.	Now set the sequence to make the app visible to each user. We recommend to pin the app in the top 5, so that it is easily visible to end users on each client. Hit Save to make this change.


#### Step 6 Publish the Webpart in the sharepoint site
Once the Sharepoint package file is uploaded to App catalog.
1.	Click the edit on the Sharepoint page
2.	Click Add a new section (+) on the left-hand side of the page, and then click One Column.
3.	Click +, then select DailyUpdate web part.
<p> <img src="screenshots/Add Spfx webpart .png"/>

Click on Edit Webpart, fill in the description details and Republish.
<p> <img src="screenshots/Edit the webpart-description.png"/>