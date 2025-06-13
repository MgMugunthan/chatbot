from flask import Flask, render_template, request, jsonify
import google.generativeai as ai

app = Flask(__name__)

# Configure the Google Generative AI API
API_KEY = ''#your API key
ai.configure(api_key=API_KEY)
model = ai.GenerativeModel("gemini-1.5-flash")
chat = model.start_chat()

@app.route('/')
def home():
    # Render the frontend HTML file
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat_response():
    # Get the user message from the frontend
    user_message = request.json.get('message')
    
    if not user_message:
        return jsonify({'reply': 'I didn\'t receive any message!'})

    # Generate a chatbot response using Google Generative AI
    try:
        response = chat.send_message(user_message)
        chatbot_reply = response.text
    except Exception as e:
        chatbot_reply = 'Error generating response. Please try again later.'

    # Return the chatbot's response as JSON
    return jsonify({'reply': chatbot_reply})

if __name__ == '__main__':
    app.run(debug=True)
+
