import { useState } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import { useTranslation } from "react-i18next";


const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 32px;
  text-align: center;
`;

const Header = styled.h1`
  font-size: 2rem;
  margin-bottom: 12px;
`;

const SubText = styled.p`
  color: #555;
  margin-bottom: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const TextArea = styled.textarea`
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  min-height: 120px;
`;

const Button = styled.button`
  display: block;
  margin: 0 auto;
  padding: 12px 24px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  background-color: #28a745;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
  max-width: 200px;

  &:hover {
    background-color: #218838;
  }
`;

const Confirmation = styled.div`
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;
  padding: 12px;
  margin-top: 16px;
  border-radius: 8px;
`;

export default function ContactUs() {
    const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_aqw6kzn",
        "template_jsykdml",
        formData,
        "Ev-qeQ3r4kkEbAlrs"
      )
      .then(
        (result) => {
          console.log(result.text);
          setSent(true);
          setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
            setTimeout(() => {
          setSent(false);
        }, 5000);
        },
        (error) => {
          console.log(error.text);
          alert("Sorry, something went wrong. Please try again later.");
        }
      );
  };

  return (
    <Container>
      <Header>{t("contact.header")}</Header>
      <SubText>
        {t("contact.text")}
      </SubText>

      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder={t("contact.name")}
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder={t("contact.email")}
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Select name="subject" value={formData.subject} onChange={handleChange}>
          <option>{t("contact.subject.s1")}</option>
          <option>{t("contact.subject.s2")}</option>
          <option>{t("contact.subject.s3")}</option>
          <option>{t("contact.subject.s4")}</option>
        </Select>
        <TextArea
          name="message"
          placeholder={t("contact.message")}
          value={formData.message}
          onChange={handleChange}
          required
        />
        <Button type="submit">{t("contact.send")}</Button>
      </Form>

      {sent && (
        <Confirmation>
          ✅{t("contact.confirmation")}
        </Confirmation>
      )}

      <div style={{ marginTop: "32px" }}>
        <h3>{t("contact.alternative")}</h3>
        <p>
          📧 Email: <strong>naeltork6@gmail.com</strong>
        </p>
        <p>
          ☎️ Phone: <strong>+81-90-8917-2511</strong>
        </p>
      </div>
    </Container>
  );
}
