curl -X 'POST' \
  'https://chatbot-backend-livid.vercel.app/chat' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "message": ["hi","hi","1부터 10까지 더하는 파이썬 코드 작성해줘"]
}'
