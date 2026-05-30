import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { K8S_CHECKLIST, TOTAL_ITEMS } from './k8s-checklist'

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#0f0f0f',
    color: '#e5e5e5',
    fontFamily: 'Helvetica',
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 48,
  },
  header: {
    marginBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
    paddingBottom: 20,
  },
  eyebrow: {
    fontSize: 8,
    color: '#ff4d2e',
    letterSpacing: 2,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 11,
    color: '#888888',
    lineHeight: 1.5,
  },
  meta: {
    fontSize: 9,
    color: '#555555',
    marginTop: 6,
  },
  categoryBlock: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#ff4d2e',
    letterSpacing: 1.5,
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#1e1e1e',
  },
  item: {
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'flex-start',
  },
  checkbox: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: '#404040',
    marginRight: 8,
    marginTop: 1,
    flexShrink: 0,
  },
  itemText: {
    fontSize: 10,
    color: '#cccccc',
    lineHeight: 1.5,
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 32,
    left: 48,
    right: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#1e1e1e',
    paddingTop: 10,
  },
  footerText: {
    fontSize: 8,
    color: '#444444',
  },
  footerAccent: {
    fontSize: 8,
    color: '#ff4d2e',
  },
})

export function K8sChecklistPDF() {
  return (
    <Document
      title="Production Kubernetes Checklist"
      author="Kamal Hussain"
      subject={`${TOTAL_ITEMS}-item checklist for production-grade Kubernetes clusters`}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>KAMALHUSSAIN.DEV · FREE RESOURCE</Text>
          <Text style={styles.title}>Production Kubernetes Checklist</Text>
          <Text style={styles.subtitle}>
            {TOTAL_ITEMS} items your cluster needs before it touches production.{'\n'}
            Compiled from real-world engagements by Kamal Hussain, freelance DevOps
            engineer.
          </Text>
          <Text style={styles.meta}>kamalhussain.dev · hello@kamalhussain.dev</Text>
        </View>

        {K8S_CHECKLIST.map((category) => (
          <View key={category.title} style={styles.categoryBlock} wrap={false}>
            <Text style={styles.categoryTitle}>{category.title.toUpperCase()}</Text>
            {category.items.map((item, i) => (
              <View key={i} style={styles.item}>
                <View style={styles.checkbox} />
                <Text style={styles.itemText}>{item}</Text>
              </View>
            ))}
          </View>
        ))}

        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>© Kamal Hussain · kamalhussain.dev</Text>
          <Text style={styles.footerAccent}>Production Kubernetes Checklist</Text>
        </View>
      </Page>
    </Document>
  )
}
