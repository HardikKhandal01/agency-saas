import React from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Starter',
      price: '$49',
      description: 'Perfect for freelance marketers.',
      features: ['Up to 5 Clients', 'Basic CRM', 'Google Ads Tracking', 'Email Support'],
      isPopular: false
    },
    {
      name: 'Agency Pro',
      price: '$99',
      description: 'Everything you need to scale.',
      features: ['Up to 50 Clients', 'Advanced Kanban CRM', 'Omnichannel Tracking', 'AI Content Studio', '24/7 Priority Support'],
      isPopular: true
    },
    {
      name: 'Enterprise',
      price: '$249',
      description: 'For large established agencies.',
      features: ['Unlimited Clients', 'Custom White-labeling', 'Dedicated Account Manager', 'Custom AI Models', 'API Access'],
      isPopular: false
    }
  ];

  return (
    <section style={{ padding: '100px 0', position: 'relative' }}>
      <div className="container">
        
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '700', marginBottom: '16px' }}>Simple, transparent pricing</h2>
          <p style={{ fontSize: '18px', color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            No hidden fees. No surprise charges. Choose the plan that best fits your agency's needs.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', alignItems: 'center' }}>
          {plans.map((plan, index) => (
            <div key={index} className="glass-panel" style={{ 
              padding: '40px', 
              borderRadius: '24px',
              border: plan.isPopular ? '2px solid var(--primary)' : '1px solid var(--border-color)',
              transform: plan.isPopular ? 'scale(1.05)' : 'scale(1)',
              background: plan.isPopular ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.6)'
            }}>
              
              {plan.isPopular && (
                <span style={{ background: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)' }}>
                  MOST POPULAR
                </span>
              )}

              <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>{plan.name}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '24px' }}>{plan.description}</p>
              
              <div style={{ marginBottom: '32px' }}>
                <span style={{ fontSize: '48px', fontWeight: '800' }}>{plan.price}</span>
                <span style={{ color: 'var(--text-muted)' }}>/month</span>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '40px' }}>
                {plan.features.map((feature, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', fontSize: '15px' }}>
                    <div style={{ background: 'rgba(40, 70, 158, 0.1)', padding: '4px', borderRadius: '50%', color: 'var(--primary)' }}>
                      <Check size={16} />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>

              <button 
                className={plan.isPopular ? 'btn-primary' : 'glass-panel'} 
                style={{ 
                    width: '100%', 
                    padding: '12px', 
                    borderRadius: '8px',
                    border: plan.isPopular ? 'none' : '1px solid var(--border-color)',
                    background: plan.isPopular ? '' : 'white',
                    fontWeight: '600',
                    cursor: 'pointer'
                }}
                onClick={() => navigate('/auth')}
              >
                Get Started
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Pricing;