import {
  Box,
  Button,
  Group,
  Stack,
  Table,
  TextInput,
  Title,
  Text,
  Select
} from "@mantine/core";
import { useState } from "react";

interface ItemRow {
  section: string;
  size: string;
  qty: number;
  thickness: string;
  color: string;
  rate: number;
  discount: number;
}

export default function AluminumBilling() {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [date, setDate] = useState("");
  const [customerName, setCustomerName] = useState("");
   const [companyName, setCompanyName] = useState("");
  const [rows, setRows] = useState<ItemRow[]>([
    {
      section: "",
      size: "",
      qty: 0,
      thickness: "",
      color: "",
      rate: 0,
      discount: 0,
    },
  ]);

  const handleChange = <T extends keyof ItemRow>(
    index: number,
    field: T,
    value: ItemRow[T]
  ) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        section: "",
        size: "",
        qty: 0,
        thickness: "",
        color: "",
        rate: 0,
        discount: 0,
      },
    ]);
  };

  const removeRow = (index: number) => {
    const updated = [...rows];
    updated.splice(index, 1);
    setRows(updated);
  };

  const calculateDiscounted = (row: ItemRow) => {
    const sizeNum = parseFloat(row.size) || 0;
    const total = sizeNum * row.qty * row.rate;
    return total - (total * row.discount) / 100;
  };

  const totalAmount = rows.reduce((acc, row) => {
    const sizeNum = parseFloat(row.size) || 0;
    return acc + sizeNum * row.qty * row.rate;
  }, 0);

  const totalDiscounted = rows.reduce((acc, row) => {
    return acc + calculateDiscounted(row);
  }, 0);

  return (
    <Box p="md">
      <Stack gap="md">
        {/* BILL CONTENT STARTS HERE */}
        <Box
          id="bill-content"
          bg="white"
          p="lg"
          style={{
            borderRadius: "12px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          }}
        >
                    {/* Logo & Header */}
          <Box mb="lg" style={{ borderBottom: "1px solid #ddd", paddingBottom: "1rem" }}>
            <Group justify="space-between" align="flex-start" wrap="nowrap">
              {/* Left: Logo & Tagline */}
              <Stack gap={4} align="flex-start">
                <img
                  src="/Logo.png"
                  alt="Company Logo"
                  style={{ width: 180, height: 80, objectFit: "contain", borderRadius: 8 }}
                />
                <Text size="sm" c="dimmed" style={{ fontStyle: "italic" }}>
                  Aluminum Hardware Store
                </Text>
              </Stack>
          
              {/* Middle: Address */}
              <Stack gap={2} align="center" style={{ flexGrow: 1 }}>
                <Title order={3} style={{ marginBottom: -4 }}>Address</Title>
                <Text size="sm" c="gray">
                 Badozai Street, Outside Bohar Gate, Multan, Pakistan
                </Text>
                <Text size="sm" c="gray">
                  Monday–Saturday | 10 AM – 10 PM
                </Text>
              </Stack>
          
              {/* Right: Business Info */}
              <Stack gap={4} align="flex-end">
                <Title order={1} style={{ margin: 0, fontWeight: 700, letterSpacing: 4 }}>Wahid Sons</Title>
                <Text size="sm" c="gray" style={{ marginTop: -6, wordSpacing: 34 }}>
                  Aluminum Hardware Store
                </Text>
          
                <Stack gap={2} mt={6}>
                  <Group gap="xs">
                    <Text fw={500}>Haji Umer Akram:</Text>
                    <Text c="gray">0300-6341646</Text>
                  </Group>
                  <Group gap="xs">
                    <Text fw={500}>Haji Mak'ki Umer:</Text>
                    <Text c="gray">0300-0793062</Text>
                  </Group>
                </Stack>
              </Stack>
            </Group>
          </Box>
          
          <Group justify="space-between">
            <TextInput
              label="Invoice No."
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.currentTarget.value)}
              w={200}
            />
            <TextInput
              label="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.currentTarget.value)}
              w={260}
            />
            <TextInput
              label="Date"
              value={date}
              onChange={(e) => setDate(e.currentTarget.value)}
              w={260}
            />
             <TextInput
              label="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.currentTarget.value)}
              w={250}
            />
            <TextInput label="City" value={"Multan"} readOnly w={260} />
          </Group>

          <Box mt="md" />

          <Table withTableBorder highlightOnHover mt={20}>
            <thead>
              <tr>
                <th>S/No</th>
                <th>Section</th>
                <th>Size</th>
                <th>Quantity</th>
                <th>Gaje</th>
                <th>Color</th>
                <th>Rate</th>
                <th>Discount %</th>
                <th>Amount</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} style={{ textAlign: "center" }}>
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  <td style={{ textAlign: "center" }}>
                    <TextInput
                      value={row.section}
                      onChange={(e) =>
                        handleChange(index, "section", e.currentTarget.value)
                      }
                    
                      
                    />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <TextInput
                      value={row.size}
                      onChange={(e) =>
                        handleChange(index, "size", e.currentTarget.value)
                      }
                      w={100}
                    />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <TextInput
                      type="number"
                      value={row.qty}
                      onChange={(e) =>
                        handleChange(index, "qty", Number(e.currentTarget.value))
                      }
                       w={100}
                    />
                  </td>
                  <td style={{ textAlign: "center" }}>
                   <Select
  data={["0.9", "1.1", "1.2", "1.4", "1.6", "2.0"]}
  value={row.thickness}
  onChange={(value) => handleChange(index, "thickness", value || "")}
  w={100}
   checkIconPosition="right"
/>
                  </td>
                  <td style={{ textAlign: "center" }}>
                   <Select
  data={["CH", "BLM", "WT", "SL"]}
  value={row.color}
  onChange={(value) => handleChange(index, "color", value || "")}
  defaultValue={"CH"}
   checkIconPosition="right"
   allowDeselect
/>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <TextInput
                      type="number"
                      value={row.rate}
                      onChange={(e) =>
                        handleChange(index, "rate", Number(e.currentTarget.value))
                      }
                      
                    />
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <TextInput
                      type="number"
                      value={row.discount}
                      onChange={(e) =>
                        handleChange(index, "discount", Number(e.currentTarget.value))
                      }
                       w={100}
                    />
                  </td>
                  <td style={{ textAlign: "center" }}>{calculateDiscounted(row).toFixed(2)}</td>
                  <td>
                    <Button color="red" size="xs" onClick={() => removeRow(index)}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Group justify="end" mt="md">
            <Box
              p="md"
              style={{
                backgroundColor: "#f9f9f9",
                borderRadius: 8,
                border: "1px solid #eee",
                minWidth: 250,
              }}
            >
              <div><strong>Total Amount:</strong> Rs. {totalAmount.toFixed(2)}</div>
              <div><strong>Discounted Amount:</strong> Rs. {totalDiscounted.toFixed(2)}</div>
            </Box>
          </Group>
        </Box>
        {/* BILL CONTENT ENDS HERE */}

       <Group justify="space-between" mt="xl">
  <Button onClick={addRow}>Add Item</Button>
  <Button >Save Bill</Button>
  <Button onClick={() => window.print()}>Print Bill</Button>
</Group>
      </Stack>
    </Box>
  );
}
