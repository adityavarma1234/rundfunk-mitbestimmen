import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupComponentTest } from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

let intl;
describe('Integration | Component | broadcast sort', function() {
  setupComponentTest('broadcast-sort', {
    integration: true,
    setup() {
      intl = this.container.lookup('service:intl');
      intl.setLocale('en');
    }
  });

  it('renders', function() {
    this.render(hbs`{{broadcast-sort}}`);
    expect(this.$()).to.have.length(1);
  });

  describe('given sort param', function() {
    it('respective button is active', function() {
      this.render(hbs`{{broadcast-sort sort='asc'}}`);
      expect(this.$('#alphabetical_order_ascending').hasClass('active')).to.be.true;
    });

    it('other buttons are inactive', function() {
      this.render(hbs`{{broadcast-sort sort='asc'}}`);
      expect(this.$('#random_order').hasClass('active')).to.be.false;
      expect(this.$('#alphabetical_order_descending').hasClass('active')).to.be.false;
    });
  });

  describe('click on sort buttons', function() {
    it('calls the sortAction action', function(done) {
      this.set('sortAction', (order) => {
        expect(order).to.eq('desc');
        done();
      });
      this.render(hbs`{{broadcast-sort sort='random' sortAction=sortAction}}`);
      this.$('#alphabetical_order_descending').click();
    });

    it('switches the active button', function() {
      this.set('sortAction', () => {return null});
      this.render(hbs`{{broadcast-sort sort='random' sortAction=sortAction}}`);
      this.$('#alphabetical_order_descending').click();
      expect(this.$('#alphabetical_order_descending').hasClass('active')).to.be.true;
      expect(this.$('#random_order').hasClass('active')).to.be.false;
    });
  });
});
