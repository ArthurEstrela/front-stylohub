import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso",
};

const sections = [
  {
    title: "1. Aceitação dos Termos",
    content:
      "Ao acessar ou usar o Stylohub, você concorda em estar vinculado a estes Termos de Uso. Se não concordar com qualquer parte destes termos, não poderá usar o serviço. Estes termos se aplicam a todos os visitantes, usuários e outras pessoas que acessem o serviço.",
  },
  {
    title: "2. Descrição do Serviço",
    content:
      "O Stylohub é uma plataforma que permite aos usuários criar páginas de links personalizadas ('bio links') para compartilhar com seu público em redes sociais e outros canais digitais. O serviço está disponível nos planos Gratuito e PRO, com funcionalidades diferenciadas conforme descrito na página de preços.",
  },
  {
    title: "3. Conta de Usuário",
    content:
      "Você é responsável por manter a confidencialidade da sua senha e por todas as atividades realizadas na sua conta. Você concorda em notificar imediatamente o Stylohub sobre qualquer uso não autorizado de sua conta. O Stylohub não pode ser responsabilizado por perdas ou danos decorrentes do não cumprimento dessas obrigações.",
  },
  {
    title: "4. Conteúdo do Usuário",
    content:
      "Você retém todos os direitos sobre o conteúdo que publicar no Stylohub. Ao publicar conteúdo, você concede ao Stylohub uma licença não exclusiva, mundial e isenta de royalties para usar, reproduzir e exibir esse conteúdo exclusivamente para fins de operação do serviço. Você é o único responsável pelo conteúdo publicado e pela sua conformidade com leis aplicáveis.",
  },
  {
    title: "5. Uso Proibido",
    content:
      "É proibido usar o Stylohub para: (a) publicar conteúdo ilegal, ofensivo, difamatório ou que viole direitos de terceiros; (b) distribuir spam, malware ou qualquer código malicioso; (c) tentar acessar sistemas ou dados não autorizados; (d) realizar engenharia reversa ou descompilar o software; (e) usar o serviço para fins comerciais não autorizados; (f) violar leis ou regulamentos aplicáveis.",
  },
  {
    title: "6. Plano PRO e Pagamentos",
    content:
      "O Plano PRO é uma assinatura recorrente cobrada mensalmente ou anualmente conforme o plano escolhido. Os pagamentos são processados por provedores de pagamento terceiros seguros. O cancelamento pode ser feito a qualquer momento, com acesso às funcionalidades PRO mantido até o fim do período pago. Não realizamos reembolsos proporcionais por cancelamentos antecipados.",
  },
  {
    title: "7. Cancelamento e Rescisão",
    content:
      "Você pode cancelar sua conta a qualquer momento através das configurações do painel. O Stylohub reserva-se o direito de suspender ou encerrar contas que violem estes termos, sem aviso prévio, a seu exclusivo critério. Após o encerramento, seu conteúdo poderá ser excluído permanentemente.",
  },
  {
    title: "8. Limitação de Responsabilidade",
    content:
      "O Stylohub é fornecido 'como está', sem garantias de qualquer tipo. Na máxima extensão permitida por lei, o Stylohub não será responsável por danos indiretos, incidentais, especiais, consequenciais ou punitivos, incluindo perda de lucros, dados ou boa vontade.",
  },
  {
    title: "9. Alterações nos Termos",
    content:
      "Reservamo-nos o direito de modificar estes termos a qualquer momento. Notificaremos os usuários sobre alterações significativas por e-mail ou através de aviso proeminente no serviço. O uso continuado após as alterações constitui aceitação dos novos termos.",
  },
  {
    title: "10. Lei Aplicável",
    content:
      "Estes termos são regidos pelas leis da República Federativa do Brasil. Qualquer disputa será resolvida no foro da comarca de São Paulo, SP, com renúncia a qualquer outro, por mais privilegiado que seja.",
  },
];

export default function TermsPage() {
  return (
    <div className="bg-stylo-dark min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
        {/* Header */}
        <div className="mb-12">
          <h1
            className="text-3xl md:text-4xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            Termos de Uso
          </h1>
          <p className="text-white/40 text-sm">
            Última atualização: 13 de março de 2026
          </p>
        </div>

        {/* Intro */}
        <p className="text-white/60 text-base leading-relaxed mb-10">
          Bem-vindo ao Stylohub. Por favor, leia estes Termos de Uso com atenção antes de usar
          nosso serviço. Ao usar o Stylohub, você concorda com estes termos.
        </p>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-white font-semibold text-lg mb-3">{section.title}</h2>
              <p className="text-white/60 text-sm leading-relaxed">{section.content}</p>
            </section>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-16 p-6 bg-stylo-surface border border-white/10 rounded-xl">
          <h2 className="text-white font-semibold mb-2">Contato</h2>
          <p className="text-white/50 text-sm">
            Em caso de dúvidas sobre estes termos, entre em contato pelo e-mail{" "}
            <a href="mailto:legal@stylohub.io" className="text-stylo-gold hover:underline">
              legal@stylohub.io
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
