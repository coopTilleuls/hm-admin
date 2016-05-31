import {it, describe, expect} from '@angular/core/testing';
import {stringHelper} from './stringHelper';


  describe('String Helper', () => {

    describe('.toCamelCase', () => {

      it('should convert a string to camelCase', () => {
        expect(stringHelper.toCamelCase('people')).toBe('people');
        expect(stringHelper.toCamelCase('People')).toBe('people');
        expect(stringHelper.toCamelCase('blog posting')).toBe('blogPosting');
        expect(stringHelper.toCamelCase('Blog Posting')).toBe('blogPosting');
        expect(stringHelper.toCamelCase('Blog-Posting')).toBe('blogPosting');
        expect(stringHelper.toCamelCase('Blog-_,.;:+Posting')).toBe('blogPosting');
      });

    });
  });

