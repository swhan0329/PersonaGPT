# PersonaGPT

Unlock the power of personality-driven AI development! 🌟

This repository serves as a **template** for building interactive, personalized AI applications. It includes features such as multi-language support, responsive design, and backend integrations with OpenAI API and AWS services. Use this project as a starting point and customize it to fit your needs.

## Key Features

- 🎯 **4-Step Self-Discovery Test**  
   Explore your personality through an engaging questionnaire.
- 🤖 **Personalized Analysis using OpenAI API**  
   Leverage GPT-4 for insightful personality analysis.
- 🌏 **Multi-language Support (English/Korean)**  
   Automatic language detection with flexible localization.
- 📱 **Responsive Design**  
   Seamlessly adaptable across devices.
- 💾 **Result Image Download**  
   Save your analysis results as a shareable image.
- 📊 **User Data Analysis via AWS DynamoDB**  
   Collect anonymous user data for insights and improvements.

## Tech Stack

### **Frontend**
- **Frameworks:** React, Material-UI, TypeScript
- **Libraries:** i18next (Internationalization), html2canvas
- **Deployment:** Vercel  

### **Backend**
- **Frameworks:** AWS Lambda
- **APIs:** OpenAI API, AWS DynamoDB
- **Deployment:** AWS Lambda + API Gateway  

### **Infrastructure**
- **Frontend Deployment:** Vercel
- **Backend Deployment:** AWS

---

## Getting Started

### **Prerequisites**
- Node.js (v14 or higher)
- npm or yarn
- AWS Account
- OpenAI API Key

### **Installation & Setup**

1. **Clone the repository**  
```bash
git clone https://github.com/swhan0329/PersonaGPT.git
cd PersonaGPT
```

2. **Install dependencies**
```bash
npm install
```
   
3. Configure environment variables
```bash
REACT_APP_API_URL=your_aws_lambda_url
REACT_APP_OPENAI_API_URL=your_openai_lambda_url
```

4. Start development server
```bash
npm start
```

## Project Structure
```bash
PersonaGPT/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   ├── contexts/           # Context API
│   ├── locales/            # i18n resources
│   ├── App.js              # Main app file
│   ├── config.js           # Configuration settings
│   └── i18n.js             # i18n setup
├── PersonaGPT_lambda/      # AWS Lambda functions
└── PersonaGPT_openai/      # OpenAI Lambda functions
```

## API Documentation
### AWS Lambda API
Handles user data storage and analysis.

### OpenAI API
Integrates GPT-4 for personalized analysis.

Note: AI prompts used in this project are designed for general use but may require customization depending on your application scenario. Always test and refine prompts to ensure they align with your specific goals.

## Features in Detail
### Multi-language Support
- Automatic language detection based on user browser settings.
- English and Korean support out-of-the-box.
- Easily extensible to add new languages via i18next.

### Result Analysis
- Generate personalized insights using GPT-4.
- Provide structured and actionable feedback.
- Allow users to download results as a shareable image.

### Data Collection
- Store anonymous usage data in AWS DynamoDB.
- Analyze regional statistics and response patterns for insights.

## Deployment
- Frontend Deployment: Deploy the React app using Vercel.
- Backend Deployment: Deploy AWS Lambda functions using the AWS Management Console or AWS CLI.
- OpenAI API Integration: Requires an OpenAI API Key for backend setup.

Important: Setting up AWS Lambda, API Gateway, and OpenAI API requires basic familiarity with these services. Refer to their official documentation for detailed instructions:

- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
- [API Gateway Documentation](https://docs.aws.amazon.com/apigateway/)
- [OpenAI API Documentation](https://platform.openai.com/docs/overview)

## Contributing
1. Fork the Project
Create your Feature Branch
```bash
git checkout -b feature/AmazingFeature
```
2. Commit your Changes
```bash
git commit -m 'Add some AmazingFeature'
```
3. Push to the Branch
```bash
git push origin feature/AmazingFeature
```
4. Open a Pull Request

## License
This project is licensed under the GPL-3.0 license. See the LICENSE file for details.

## Contact
**Seowoo Han** [![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/swhan0329) [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/seowoo-han-825486170/)

# Screenshots

<table>
  <thead>
    <tr>
      <th style="width: 10%;">Feature</th>
      <th style="width: 20%;">Description</th>
      <th style="width: 70%;">Screenshot</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Welcome Page</strong></td>
      <td>This is the entry point where users start their journey.</td>
      <td>
        <img src="https://github.com/user-attachments/assets/a6bce132-80d6-4a9e-b865-4df018374326" alt="Welcome Page" width="400">
      </td>
    </tr>
    <tr>
      <td><strong>Personality Test</strong></td>
      <td>Users answer interactive questions to uncover their personality traits.</td>
      <td>
        <img src="https://github.com/user-attachments/assets/6bfcaf59-5eb2-415e-9a8c-09bed4862c9c" alt="Personality Test" width="400">
      </td>
    </tr>
    <tr>
      <td><strong>Analysis Results</strong></td>
      <td>Personalized insights are generated using GPT-4 and displayed in a visually appealing format.</td>
      <td>
        <img src="https://github.com/user-attachments/assets/7928585d-981d-45dc-842d-f697e2da9b90" alt="Analysis Results" width="200">
      </td>
    </tr>
    <tr>
      <td><strong>Downloadable Result Image</strong></td>
      <td>Users can download their results as a shareable image.</td>
      <td>
        <img src="https://github.com/user-attachments/assets/d15f434b-be84-4081-bfe7-f2126b792a9d" alt="Downloadable Result Image" width="200">
      </td>
    </tr>
    <tr>
      <td><strong>Multi-language Support</strong></td>
      <td>The app supports multiple languages, enabling global accessibility.</td>
      <td>
        <img src="https://github.com/user-attachments/assets/47bdd12b-5052-43b3-ba7e-1b3bd16d3b82" alt="Multi-language Support 1" width="200">
        <img src="https://github.com/user-attachments/assets/8a96cb97-baef-4d26-8153-45cf97f1476c" alt="Multi-language Support 2" width="200">
      </td>
    </tr>
  </tbody>
</table>

---
**Key Notes:**  
1. This repository can be used as a **template** for building interactive AI applications.  
2. **AI prompts** should be carefully refined and customized for different use cases to ensure accuracy and relevance.  

