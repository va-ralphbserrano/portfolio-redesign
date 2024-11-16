import React from 'react';
import Section from '../layout/Section';
import Container from '../layout/Container';
import AnimatedText from '../common/AnimatedText';
import Card from '../common/Card';
import { SERVICES } from '../../utils/constants';

const Services = () => {
  return (
    <Section background="light">
      <Container>
        <AnimatedText
          el="h2"
          text="My Services"
          animation="gradient"
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <Card key={service.id} animate hover>
              <Card.Body>
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Services;
