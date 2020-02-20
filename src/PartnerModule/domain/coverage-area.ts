import * as mongoose from 'mongoose';

export const CoverageArea = new mongoose.Schema({
  type: {
    type: String,
    enum: ['MultiPolygon'],
    required: true
  },
  coordinates: {
    type: [[[[Number]]]], // Array of arrays of arrays of arrays of numbers
    required: true
  }
});
