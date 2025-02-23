# OneBox Email Aggregator

OneBox Email Aggregator is a full-stack application that aggregates emails from multiple IMAP accounts, categorizes them using AI, and provides AI-generated reply suggestions. The project uses **Elasticsearch** for email storage, **Google Gemini API** for AI categorization and reply generation, and **PostgreSQL** for knowledge base storage.

---

## Features

- **Email Aggregation**: Fetch emails from multiple IMAP accounts.
- **AI Categorization**: Automatically categorize emails using AI.
- **AI Reply Suggestions**: Generate AI-powered suggested replies for emails.
- **Knowledge Base**: Store and retrieve knowledge for AI context.
- **Search and Filter**: Search and filter emails using Elasticsearch.
- **Real-time Sync**: Sync emails in real-time using IMAP.

---

## Tech Stack

### Backend
- **Node.js**: Runtime environment.
- **Express.js**: Web framework.
- **Elasticsearch**: Email storage and search.
- **PostgreSQL**: Knowledge base storage.
- **Google Gemini API**: AI for categorization and reply generation.
- **IMAP**: Fetch emails from email servers.

### Frontend
- **React**: Frontend library.
- **Material-UI (MUI)**: UI components and styling.
- **Axios**: HTTP client for API calls.

---

## Setup Instructions

### Prerequisites

1. **Node.js**: Install [Node.js](https://nodejs.org/) (v18 or higher).
2. **PostgreSQL**: Install [PostgreSQL](https://www.postgresql.org/).
3. **Elasticsearch**: Install [Elasticsearch](https://www.elastic.co/elasticsearch/).
4. **Google Gemini API Key**: Obtain an API key from [Google Cloud Console](https://console.cloud.google.com/).


### Backend Setup

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/ashu2764/onebox-email-aggregator
   cd frontend --> Frontend
      &&
    cd backend --> Backend
     
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file and configure environment variables:
   ```env
   PORT=5000
   DB_USER=your_db_user
   DB_PASS=your_db_password
   DB_HOST=your_db_host
   DB_NAME=your_db_name
   ELASTICSEARCH_URL=http://localhost:9200
   GEMINI_API_KEY=your_gemini_api_key
   IMAP_USER_1=your_imap_user
   IMAP_PASSWORD_1=your_imap_password
   IMAP_HOST_1=your_imap_host
   SLACK_WEBHOOK_URL=your_slack_webhook_url
   WEBHOOK_URL=your_webhook_url
   ```
4. Start the server:
   ```
   npm start
   ```
4. Start the Frontend:
   ```
   npm start
   ```

---

## 🌟 Usage  

1️⃣ Open the **frontend** at `http://localhost:3000`  
2️⃣ Click on an **email** to view its content  
3️⃣ Click **"Suggest Reply with AI"** to generate an AI-powered response  
4️⃣ The AI reply will appear in the email details  

---

## 🔗 API Endpoints  

| Method | Endpoint                  | Description |
|--------|---------------------------|-------------|
| `GET`  | `/api/email/sync`               | Sync all emails |
| `GET`  | `/api/email/emails`             | Fetch all emails |
| `POST` | `/api/ai/suggest`               | Generate an AI reply |
| `POST`  | `/api/ai/suggest/add-knowledge`| Add Knowledge in Db |
| `POST` | `/api/ai/categorize/:messageId` | Categorise the email |


---



  


