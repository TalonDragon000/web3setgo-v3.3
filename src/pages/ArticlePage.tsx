import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, User, Calendar, Share2 } from 'lucide-react';

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  // Mock article data - in a real app, this would come from an API or CMS
  const articles: Record<string, any> = {
    'what-is-a-wallet': {
      title: 'What is a Wallet?',
      description: 'Learn the basics of crypto wallets and how they keep your digital assets secure.',
      readTime: '5 min read',
      author: 'Sarah Chen',
      publishDate: 'March 15, 2024',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop&crop=center',
      category: 'Basics',
      content: `
        <p>A cryptocurrency wallet is your gateway to the Web3 world. Think of it as a digital equivalent of your physical wallet, but instead of holding cash and cards, it stores your digital assets and provides access to blockchain networks.</p>

        <h2>What Does a Wallet Actually Store?</h2>
        <p>Contrary to popular belief, wallets don't actually "store" your cryptocurrency. Instead, they store:</p>
        <ul>
          <li><strong>Private Keys:</strong> Secret codes that prove ownership of your digital assets</li>
          <li><strong>Public Keys:</strong> Your wallet address that others can use to send you crypto</li>
          <li><strong>Transaction History:</strong> A record of all your blockchain interactions</li>
        </ul>

        <h2>Types of Wallets</h2>
        <p>There are several types of wallets, each with different security and convenience trade-offs:</p>

        <h3>Hot Wallets (Connected to Internet)</h3>
        <ul>
          <li><strong>Browser Extensions:</strong> Like MetaMask, convenient for daily use</li>
          <li><strong>Mobile Apps:</strong> Easy to use on-the-go</li>
          <li><strong>Web Wallets:</strong> Accessible from any browser</li>
        </ul>

        <h3>Cold Wallets (Offline Storage)</h3>
        <ul>
          <li><strong>Hardware Wallets:</strong> Physical devices like Ledger or Trezor</li>
          <li><strong>Paper Wallets:</strong> Private keys written on paper</li>
        </ul>

        <h2>Security Best Practices</h2>
        <p>Keeping your wallet secure is crucial. Here are essential tips:</p>
        <ul>
          <li>Never share your private key or seed phrase with anyone</li>
          <li>Use strong, unique passwords</li>
          <li>Enable two-factor authentication when available</li>
          <li>Keep your wallet software updated</li>
          <li>Consider using a hardware wallet for large amounts</li>
        </ul>

        <h2>Getting Started Safely</h2>
        <p>For beginners, we recommend starting with a testnet wallet using fake cryptocurrency. This allows you to practice transactions and get comfortable with the interface without any financial risk.</p>

        <p>Popular beginner-friendly wallets include MetaMask, Trust Wallet, and Coinbase Wallet. Each offers different features, so research which one best fits your needs.</p>
      `
    },
    'web2-vs-web3-explained': {
      title: 'Web2 vs Web3 Explained',
      description: 'Understand the key differences between the internet we know and the decentralized web.',
      readTime: '7 min read',
      author: 'Michael Rodriguez',
      publishDate: 'March 12, 2024',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop&crop=center',
      category: 'Concepts',
      content: `
        <p>The evolution from Web2 to Web3 represents a fundamental shift in how we interact with the internet. Let's explore what makes each era unique and why Web3 is generating so much excitement.</p>

        <h2>Web2: The Current Internet</h2>
        <p>Web2, which we've been using for the past two decades, is characterized by:</p>
        <ul>
          <li><strong>Centralized Control:</strong> Big tech companies control platforms and data</li>
          <li><strong>User-Generated Content:</strong> Social media, blogs, and interactive websites</li>
          <li><strong>Data Ownership:</strong> Companies own and monetize user data</li>
          <li><strong>Platform Dependency:</strong> Users rely on centralized services</li>
        </ul>

        <h2>Web3: The Decentralized Future</h2>
        <p>Web3 introduces revolutionary concepts:</p>
        <ul>
          <li><strong>Decentralization:</strong> No single entity controls the network</li>
          <li><strong>User Ownership:</strong> Users own their data and digital assets</li>
          <li><strong>Blockchain Technology:</strong> Transparent, immutable record-keeping</li>
          <li><strong>Token Economics:</strong> Users can earn from their participation</li>
        </ul>

        <h2>Key Differences</h2>
        
        <h3>Data Ownership</h3>
        <p><strong>Web2:</strong> Facebook owns your posts, Google owns your search history<br>
        <strong>Web3:</strong> You own your data and can choose how to share it</p>

        <h3>Identity</h3>
        <p><strong>Web2:</strong> Multiple accounts across different platforms<br>
        <strong>Web3:</strong> One digital identity that works everywhere</p>

        <h3>Payments</h3>
        <p><strong>Web2:</strong> Traditional banking and payment processors<br>
        <strong>Web3:</strong> Direct peer-to-peer transactions with cryptocurrency</p>

        <h2>Real-World Examples</h2>
        <p>To better understand the difference, consider these examples:</p>
        
        <h3>Social Media</h3>
        <p><strong>Web2:</strong> Twitter controls your followers and can ban your account<br>
        <strong>Web3:</strong> Decentralized social networks where you own your followers and content</p>

        <h3>Digital Art</h3>
        <p><strong>Web2:</strong> Upload art to Instagram, they can use it in ads<br>
        <strong>Web3:</strong> Create NFTs that prove ownership and earn royalties forever</p>

        <h2>Challenges and Opportunities</h2>
        <p>Web3 isn't without challenges:</p>
        <ul>
          <li>Technical complexity for average users</li>
          <li>Scalability issues with current blockchain technology</li>
          <li>Regulatory uncertainty</li>
          <li>Environmental concerns with some blockchain networks</li>
        </ul>

        <p>However, the opportunities are immense:</p>
        <ul>
          <li>True digital ownership</li>
          <li>Global, permissionless access</li>
          <li>New economic models</li>
          <li>Reduced dependence on big tech</li>
        </ul>

        <h2>The Transition</h2>
        <p>We're currently in a transition period where Web2 and Web3 coexist. Many Web2 companies are integrating Web3 features, while new Web3-native applications are being built from the ground up.</p>

        <p>The future likely holds a hybrid model where the best of both worlds combine to create a more open, user-centric internet.</p>
      `
    },
    'why-people-talk-about-blockchains': {
      title: 'Why People Talk About Blockchains',
      description: 'Discover what makes blockchain technology revolutionary in simple, easy terms.',
      readTime: '6 min read',
      author: 'Emily Johnson',
      publishDate: 'March 10, 2024',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=400&fit=crop&crop=center',
      category: 'Technology',
      content: `
        <p>Blockchain technology is often called revolutionary, but what exactly makes it so special? Let's break down this complex technology into simple, understandable concepts.</p>

        <h2>What is a Blockchain?</h2>
        <p>Imagine a notebook that's shared among thousands of people around the world. Every time someone wants to add a new page, everyone else must agree it's valid. Once a page is added, it can never be erased or changed. That's essentially how a blockchain works.</p>

        <p>More technically, a blockchain is:</p>
        <ul>
          <li>A digital ledger of transactions</li>
          <li>Distributed across many computers</li>
          <li>Secured by cryptography</li>
          <li>Immutable once confirmed</li>
        </ul>

        <h2>Key Properties That Make It Revolutionary</h2>

        <h3>1. Decentralization</h3>
        <p>Traditional systems rely on a central authority (like a bank). Blockchain removes this middleman by distributing control across many participants. No single entity can manipulate the system.</p>

        <h3>2. Transparency</h3>
        <p>All transactions are visible to everyone on the network. While personal identities may be anonymous, the transaction history is completely transparent and auditable.</p>

        <h3>3. Immutability</h3>
        <p>Once data is recorded on a blockchain, it's extremely difficult to change. This creates a permanent, tamper-proof record of all transactions.</p>

        <h3>4. Trustless System</h3>
        <p>You don't need to trust other participants or a central authority. The system's rules are enforced by code and mathematics, not by human institutions.</p>

        <h2>Real-World Applications</h2>

        <h3>Digital Currency</h3>
        <p>Bitcoin was the first major application, showing how blockchain can enable peer-to-peer digital payments without banks.</p>

        <h3>Supply Chain Tracking</h3>
        <p>Companies use blockchain to track products from manufacture to sale, ensuring authenticity and preventing counterfeiting.</p>

        <h3>Digital Identity</h3>
        <p>Blockchain can store and verify digital identities, reducing fraud and giving users control over their personal data.</p>

        <h3>Smart Contracts</h3>
        <p>Self-executing contracts that automatically enforce agreements without intermediaries.</p>

        <h2>Why the Excitement?</h2>

        <h3>Solving Trust Problems</h3>
        <p>Many industries struggle with trust issues. Blockchain provides a way to create trust through technology rather than institutions.</p>

        <h3>Reducing Costs</h3>
        <p>By removing intermediaries, blockchain can significantly reduce transaction costs and processing times.</p>

        <h3>Global Access</h3>
        <p>Anyone with internet access can participate in blockchain networks, potentially banking the unbanked and connecting global markets.</p>

        <h3>Innovation Potential</h3>
        <p>Blockchain enables new business models and applications that weren't possible before, similar to how the internet enabled email and e-commerce.</p>

        <h2>Common Misconceptions</h2>

        <h3>"Blockchain = Bitcoin"</h3>
        <p>Bitcoin is just one application of blockchain technology. There are thousands of other uses beyond cryptocurrency.</p>

        <h3>"It's Just a Fad"</h3>
        <p>Major corporations, governments, and institutions are investing billions in blockchain research and implementation.</p>

        <h3>"It's Too Complex"</h3>
        <p>While the underlying technology is complex, using blockchain applications can be as simple as using any other app.</p>

        <h2>Challenges to Consider</h2>
        <ul>
          <li><strong>Energy Consumption:</strong> Some blockchains use significant energy</li>
          <li><strong>Scalability:</strong> Current limitations on transaction speed</li>
          <li><strong>Regulation:</strong> Unclear legal frameworks in many jurisdictions</li>
          <li><strong>User Experience:</strong> Still complex for non-technical users</li>
        </ul>

        <h2>The Future</h2>
        <p>Blockchain technology is still evolving. New solutions are addressing current limitations, and we're likely to see more user-friendly applications that make blockchain benefits accessible to everyone.</p>

        <p>The excitement around blockchain isn't just about the technology itself, but about the potential to create more open, fair, and efficient systems across many aspects of our digital lives.</p>
      `
    }
  };

  const article = articles[slug || ''];

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <Link 
            to="/learning" 
            className="text-primary-500 hover:text-primary-600 font-medium"
          >
            ← Back to Learning Hub
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/learning" 
            className="inline-flex items-center text-gray-600 hover:text-ocean-600 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Learning Hub
          </Link>
        </div>
      </header>

      {/* Article Header */}
      <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-gradient-to-r from-mint-100 to-ocean-100 text-ocean-800 text-sm font-medium rounded-full mb-4">
              {article.category}
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {article.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {article.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              {article.author}
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {article.publishDate}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {article.readTime}
            </div>
            <button className="flex items-center hover:text-ocean-500 transition-colors duration-200">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button>
          </div>

          <div className="aspect-video rounded-2xl overflow-hidden mb-8">
            <img 
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div 
            className="prose prose-xl prose-gray max-w-none
              prose-headings:text-gray-900 prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-3
              prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-5 prose-h3:text-ocean-700
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg
              prose-ul:text-gray-700 prose-ul:mb-6 prose-li:mb-3 prose-li:text-lg prose-li:leading-relaxed
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:text-ocean-700"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Continue Learning</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link 
              to="/learning/web2-vs-web3-explained"
              className="group p-6 bg-gradient-to-br from-mint-50 to-ocean-50 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200"
            >
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-ocean-600">
                Web2 vs Web3 Explained
              </h3>
              <p className="text-gray-600 text-sm">
                Understand the key differences between the internet we know and the decentralized web.
              </p>
            </Link>
            <Link 
              to="/learning/why-people-talk-about-blockchains"
              className="group p-6 bg-gradient-to-br from-mint-50 to-ocean-50 rounded-xl hover:bg-white hover:shadow-md transition-all duration-200"
            >
              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-ocean-600">
                Why People Talk About Blockchains
              </h3>
              <p className="text-gray-600 text-sm">
                Discover what makes blockchain technology revolutionary in simple, easy terms.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticlePage;