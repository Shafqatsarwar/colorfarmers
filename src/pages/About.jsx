import { useEffect } from 'react';

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const facilities = [
        {
            icon: '🖨️',
            title: 'Photocopy & Printing',
            desc: 'All types of photocopy and computer printouts (Digital, Powder, Color Laser), Maps etc.',
        },
        {
            icon: '💾',
            title: 'Digitization & Imaging',
            desc: 'Latest solution to convert your paper environment into digitized form (Paperless).',
        },
        {
            icon: '🖥️',
            title: 'Office Equipment',
            desc: 'Photocopiers, Printers, Scanners, MFP\'s & Facsimiles.',
        },
        {
            icon: '📚',
            title: 'Books & Stationary',
            desc: 'Imported & Local Books, Journals, All types of papers & office stationary.',
        },
        {
            icon: '📦',
            title: 'General Order Supply',
            desc: 'All type of routine and specialties products, paper, consumables and services.',
        },
    ];

    const timeline = [
        { year: '1987', event: 'Founded Scholars Photostat Centre', icon: '🎯' },
        { year: '1995', event: 'Expanded to Digital Printing Services', icon: '🖨️' },
        { year: '2005', event: 'Introduced Large Format Printing', icon: '🗺️' },
        { year: '2015', event: 'Added Custom Printing Services', icon: '🎨' },
        { year: '2025', event: 'Serving 100+ Corporate Clients', icon: '🏆' },
    ];

    return (
        <div className="pt-20">
            {/* Hero Section with Logo */}
            <section className="section-padding bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        {/* Logo Display */}
                        <div className="flex justify-center mb-8">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                                <div className="relative bg-white rounded-full p-6 shadow-2xl">
                                    <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-full flex items-center justify-center text-6xl md:text-7xl">
                                        📄
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            About <span className="gradient-text">Scholars Photostat Centre</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Serving the Nation Since 1987 with Excellence in Printing & Imaging Services 🎉
                        </p>
                    </div>
                </div>
            </section>

            {/* Company Introduction */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <div className="card-gradient space-y-6 text-lg leading-relaxed text-gray-700">
                            <p className="text-xl font-semibold text-gray-900">
                                We are providing photocopy, computer printing & digital imaging services to commercial as well as public sector. 🏢
                            </p>
                            <p>
                                We have the latest models of high speed digital laser photocopiers, Printers, Scanners & variety of supplies. We have comprehensive solutions for your institution. If you give us opportunity to provide related services then we assure you the quality of work in time. ⚡
                            </p>
                            <p>
                                We are specialized in photocopy, imaging, office equipments & supplies. We believe in the quality of service, equipments and quality of our product we have. Our existing setup is equipped with latest copiers and image processing units. We also have specialty in data entry and management services. 💯
                            </p>
                            <p className="font-semibold text-primary-700">
                                Perfection of work, manipulation and idea generation is our specialty! ✨
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="container-custom">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
                        Our <span className="gradient-text">Journey</span>
                    </h2>
                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-8">
                            {timeline.map((item, index) => (
                                <div key={index} className="flex items-start space-x-6 group">
                                    <div className="flex-shrink-0">
                                        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            {item.icon}
                                        </div>
                                    </div>
                                    <div className="flex-grow">
                                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                            <div className="text-2xl font-bold gradient-text mb-2">{item.year}</div>
                                            <p className="text-lg text-gray-700">{item.event}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Facilities */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
                        Our <span className="gradient-text">Facilities</span>
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {facilities.map((facility, index) => (
                            <div
                                key={index}
                                className="card group hover:scale-105 transition-all duration-300"
                            >
                                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {facility.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{facility.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{facility.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Document Lifecycle */}
            <section className="section-padding bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                            Complete <span className="gradient-text">Document Lifecycle</span> Solutions
                        </h2>
                        <div className="card-gradient">
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                For every phase of the document lifecycle - from input to archive – Scholars Photostat Centre offers best-in-class products and services to enhance efficiency. 📊
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                We use a consultative approach - first understanding customer needs, then applying the appropriate hardware, software and services to implement a streamlined document workflow. 🔄
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="card-gradient">
                            <div className="text-5xl mb-4">🎯</div>
                            <h3 className="text-2xl font-bold mb-4 gradient-text">Our Mission</h3>
                            <p className="text-gray-700 leading-relaxed">
                                To provide exceptional printing and imaging services with unwavering commitment to quality, speed, and customer satisfaction. We strive to be the most trusted partner for all document and printing needs in Pakistan.
                            </p>
                        </div>
                        <div className="card-gradient">
                            <div className="text-5xl mb-4">👁️</div>
                            <h3 className="text-2xl font-bold mb-4 gradient-text">Our Vision</h3>
                            <p className="text-gray-700 leading-relaxed">
                                To revolutionize the printing industry through innovation, technology, and exceptional service. We envision becoming the leading printing solutions provider, known for excellence and reliability across Pakistan.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="section-padding bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="container-custom">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
                        Our <span className="gradient-text">Core Values</span>
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: '⭐', title: 'Quality', desc: 'Excellence in every print' },
                            { icon: '⚡', title: 'Speed', desc: 'Fast turnaround times' },
                            { icon: '🤝', title: 'Trust', desc: 'Building lasting relationships' },
                            { icon: '💡', title: 'Innovation', desc: 'Latest technology & methods' },
                        ].map((value, index) => (
                            <div key={index} className="card text-center group hover:scale-105 transition-transform duration-300">
                                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                                <p className="text-gray-600">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section-padding bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 text-white">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                        Join Our Growing Family! 🌟
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Experience the difference of working with a trusted partner since 1987.
                    </p>
                    <a
                        href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '923004251833'}?text=Hello! I'd like to know more about your services.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                        Contact Us Today 📞
                    </a>
                </div>
            </section>
        </div>
    );
};

export default About;
