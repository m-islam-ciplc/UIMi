import "./uimi.css";

export function SaveButton() {
  return <button className="uimi-btn uimi-btn--primary">Save</button>;
}

export function AccountTabs() {
  return (
    <div className="uimi-tabset" data-uimi-tabs>
      <div className="uimi-tabs" role="tablist">
        <button type="button" className="uimi-tab" data-tab="overview" aria-selected="true">
          Overview
        </button>
        <button type="button" className="uimi-tab" data-tab="invoices" aria-selected="false">
          Invoices
        </button>
      </div>
      <div className="uimi-tab-panel" data-uimi-panel="overview">
        Account summary
      </div>
      <div className="uimi-tab-panel" data-uimi-panel="invoices" hidden>
        Invoice list
      </div>
    </div>
  );
}
