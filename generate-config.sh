#!/bin/bash

. .env
cat <<EOF > src/app.config.ts
export const config = {
  apiUrl: '$API_URL'
};
EOF
