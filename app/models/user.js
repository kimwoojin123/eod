const mongoose = require('mongoose');

// 이미 정의되지 않았다면 모델을 정의합니다.
if (!mongoose.models.User) {
  const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    email: String,
    phoneNumber: String,
    address: String,
  });

  mongoose.model('User', userSchema);
}

// 여기서 인증 정보를 넣어주세요.
mongoose.connect('mongodb+srv://kimwoojin:dnwls12@kimcluster.vi2fpad.mongodb.net/eoddb?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // 다른 옵션들을 필요에 따라 추가하세요.
});

module.exports = mongoose.model('User');