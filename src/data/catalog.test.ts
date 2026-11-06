import { describe, it } from 'node:test';
import assert from 'node:assert';
import { allBreeds, TOTAL_BREEDS_COUNT } from './breedsCatalog.ts';
import { anatomyGuides } from './anatomy.ts';
import { heritageArticles } from './heritage.ts';
import { anatomicalHotspots } from './hotspots.ts';

describe('Global Horse Atlas Master Data Integrity', () => {
  it('should contain at least 200 documented breed profiles', () => {
    assert.ok(TOTAL_BREEDS_COUNT >= 200, `Expected at least 200 breeds, got ${TOTAL_BREEDS_COUNT}`);
    assert.strictEqual(allBreeds.length, TOTAL_BREEDS_COUNT);
  });

  it('should have strictly unique IDs across all breeds', () => {
    const ids = new Set<string>();
    for (const breed of allBreeds) {
      assert.ok(!ids.has(breed.id), `Duplicate breed ID detected: ${breed.id}`);
      ids.add(breed.id);
      assert.ok(breed.name.length > 0, `Breed ${breed.id} has empty name`);
      assert.ok(breed.originCountry.length > 0, `Breed ${breed.id} has empty originCountry`);
      assert.ok(breed.conformationSummary.headAndNeck.length > 0, `Breed ${breed.id} has missing conformation`);
      assert.ok(breed.saddleConnection.fittingGuidance.length > 0, `Breed ${breed.id} has missing saddle connection`);
    }
  });

  it('should contain exactly 50 anatomy guides across 5 departments', () => {
    assert.strictEqual(anatomyGuides.length, 50, `Expected 50 anatomy guides, found ${anatomyGuides.length}`);
    const departments = new Set(anatomyGuides.map(g => g.department));
    assert.strictEqual(departments.size, 5, 'Expected 5 distinct anatomy departments');
    
    const guideIds = new Set<string>();
    for (const guide of anatomyGuides) {
      assert.ok(!guideIds.has(guide.id), `Duplicate anatomy guide ID: ${guide.id}`);
      guideIds.add(guide.id);
      assert.ok(guide.primaryStructures.length > 0, `Guide ${guide.id} missing primary structures`);
      assert.ok(guide.academicReferences.length > 0, `Guide ${guide.id} missing academic references`);
    }
  });

  it('should contain exactly 30 heritage and historical articles', () => {
    assert.strictEqual(heritageArticles.length, 30, `Expected 30 heritage articles, found ${heritageArticles.length}`);
    const articleIds = new Set<string>();
    for (const article of heritageArticles) {
      assert.ok(!articleIds.has(article.id), `Duplicate article ID: ${article.id}`);
      articleIds.add(article.id);
      assert.ok(article.contentSections.length >= 2, `Article ${article.id} has fewer than 2 content sections`);
      assert.ok(article.archaeologicalAndHistoricalSources.length > 0, `Article ${article.id} missing historical sources`);
    }
  });

  it('should provide anatomical hotspots covering key systems', () => {
    assert.ok(anatomicalHotspots.length >= 15, `Expected at least 15 hotspots, got ${anatomicalHotspots.length}`);
    const systems = new Set(anatomicalHotspots.map(h => h.system));
    assert.ok(systems.has('skeletal'), 'Missing skeletal hotspots');
    assert.ok(systems.has('muscular'), 'Missing muscular hotspots');
    assert.ok(systems.has('saddle'), 'Missing saddle hotspots');
  });
});
