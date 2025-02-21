import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  urlToImage: { type: String },
  publishedAt: { type: Date },
}, { timestamps: true });

const Article = mongoose.model('Article', articleSchema);
export default Article;
