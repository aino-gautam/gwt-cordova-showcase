package com.florianf.gwtcordovashowcase.client;

import com.florianf.gwtcordova.client.plugin.contacts.Contact;
import com.florianf.gwtcordova.client.plugin.contacts.ContactField;
import com.florianf.gwtcordova.client.plugin.contacts.ContactFindOptions;
import com.florianf.gwtcordova.client.plugin.contacts.ContactName;
import com.florianf.gwtcordova.client.plugin.contacts.Contacts;
import com.google.gwt.core.client.GWT;
import com.google.gwt.core.client.JsDate;
import com.google.gwt.event.dom.client.ClickEvent;
import com.google.gwt.uibinder.client.UiBinder;
import com.google.gwt.uibinder.client.UiField;
import com.google.gwt.uibinder.client.UiHandler;
import com.google.gwt.user.client.Window;
import com.google.gwt.user.client.ui.Button;
import com.google.gwt.user.client.ui.Composite;
import com.google.gwt.user.client.ui.HTMLPanel;
import com.google.gwt.user.client.ui.Label;
import com.google.gwt.user.client.ui.VerticalPanel;

public class ContactsSample extends Composite {
    interface ContactsSampleUiBinder extends UiBinder<HTMLPanel, ContactsSample> {
    }

    private static ContactsSampleUiBinder ourUiBinder = GWT.create(ContactsSampleUiBinder.class);

    @UiField Button saveButton;
    @UiField Button listButton;
    @UiField VerticalPanel contactsPanel;

    public ContactsSample() {
        initWidget(ourUiBinder.createAndBindUi(ContactsSample.this));
    }

    @UiHandler("listButton")
    void listContacts(ClickEvent e) {
        ContactFindOptions options = new ContactFindOptions();
        options.filter = "";
        options.multiple = true;

        contactsPanel.clear();
        contactsPanel.add(new Label("Reading contacts ..."));

        Contacts.find(new String[]{"*"}, contacts -> {
            contactsPanel.clear();
            for (Contact c : contacts) {
              contactsPanel.add(new Label(
                  "displayName: " + c.getDisplayName() + " " +
                  "Name: " + c.getName().givenName + " " +
                  "Email: " + (c.getEmails() != null && c.getEmails().length > 0 ? c.getEmails()[0].value : "-") + " " +
                  "Phone: " + (c.getPhoneNumbers() != null && c.getPhoneNumbers().length > 0 ? c.getPhoneNumbers()[0].value : "-") + " "
              ));
            }
            return null;
        }, null, options);
    }

    @UiHandler("saveButton")
    void saveContact(ClickEvent e) {
        Contact contact = Contacts.create();
        ContactName name = new ContactName();
        name.givenName = "Donald";
        name.familyName = "Trump";
        contact.setName(name);
        contact.setDisplayName("Potus");
        contact.setBirthday(JsDate.create(2017, 1, 20));
        contact.setPhoneNumbers(new ContactField[] { new ContactField("phoneNumbers", "+1222333444", true) });
        contact.setEmails(new ContactField[] { new ContactField("emails", "potus@usa.gov", true) });

        contact.save(saved -> {
            Window.alert("Contact saved: " + saved.getDisplayName());
            return null;
        }, err -> {
            Window.alert("Contact not saved " + err);
            return null;
        });
    }

}
