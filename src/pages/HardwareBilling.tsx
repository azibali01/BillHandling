import {
  Box,
  Button,
  Group,
  Stack,
  Table,
  TextInput,
  Text,
  Title,
} from "@mantine/core";
import { useState } from "react";

interface ItemRow {
  product: string;
  rate: number;
  qty: number;
}

export default function HardwareBilling() {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [date, setDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [previousAmount, setPreviousAmount] = useState(0);
  const [rows, setRows] = useState<ItemRow[]>([
    { product: "", rate: 0, qty: 0 },
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
    setRows([...rows, { product: "", rate: 0, qty: 0 }]);
  };

  const removeRow = (index: number) => {
    const updated = [...rows];
    updated.splice(index, 1);
    setRows(updated);
  };

  const calculateGross = (row: ItemRow) => {
    return row.qty * row.rate;
  };

  const totalAmount = rows.reduce((acc, row) => acc + calculateGross(row), 0);
  const grandTotal = totalAmount + previousAmount;

  return (
    <Box p="md" style={{ fontSize: "12px" }}>
      <Stack gap="md">
        <Box
          id="bill-content"
          bg="white"
          p="lg"
          style={{
            borderRadius: "12px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
            fontSize: "12px",
          }}
        >
          <Box mb="lg" style={{ borderBottom: "1px solid #ddd", paddingBottom: "1rem" }}>
            <Group justify="space-between" align="flex-start" wrap="wrap">
              <Stack gap={4} align="flex-start" miw={150}>
                <img
                  src="/Logo.png"
                  alt="Company Logo"
                  style={{ width: 140, height: 60, objectFit: "contain", borderRadius: 8 }}
                />
                <Text size="xs" c="dimmed" style={{ fontStyle: "italic" }}>
                  Aluminum Hardware Store
                </Text>
              </Stack>

              <Stack gap={2} align="center" style={{ flexGrow: 1, minWidth: 200 }}>
                <Title order={4} style={{ marginBottom: -4 }}>Address</Title>
                <Text size="xs" c="gray">
                  Badozai Street, Outside Bohar Gate, Multan, Pakistan
                </Text>
                <Text size="xs" c="gray">
                  Monday–Saturday | 10 AM – 10 PM
                </Text>
              </Stack>

              <Stack gap={2} align="flex-end" miw={150}>
                <Title order={2} style={{ fontSize: "18px", margin: 0, letterSpacing: 2 }}>Wahid Sons</Title>
                <Text size="xs" c="gray" style={{ marginTop: -6, wordSpacing: 18 }}>
                  Aluminum Hardware Store
                </Text>

                <Stack gap={2} mt={6}>
                  <Group gap="xs">
                    <Text size="xs" fw={500}>Haji Umer Akram:</Text>
                    <Text size="xs" c="gray">0300-6341646</Text>
                  </Group>
                  <Group gap="xs">
                    <Text size="xs" fw={500}>Haji Mak'ki Umer:</Text>
                    <Text size="xs" c="gray">0300-0793062</Text>
                  </Group>
                </Stack>
              </Stack>
            </Group>
          </Box>

         
          <Group justify="space-between" wrap="wrap" gap="sm" mt={10}>
            <TextInput
              size="xs"
              label="Invoice No."
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.currentTarget.value)}
              w={{ base: "100%", sm: 250 }}
            />
            <TextInput
              size="xs"
              label="Customer name"
              value={customerName}
              onChange={(e) => setCustomerName(e.currentTarget.value)}
              w={{ base: "100%", sm: 250 }}
            />
            <TextInput
              size="xs"
              label="Date"
              value={date}
              onChange={(e) => setDate(e.currentTarget.value)}
              w={{ base: "100%", sm: 250 }}
            />
            <TextInput
              size="xs"
              label="City"
              value="Multan"
              readOnly
              w={{ base: "100%", sm: 250 }}
            />
          </Group>

   
          <Box maw={900} mx="auto" mt="md">
            <Table withTableBorder highlightOnHover style={{ fontSize: "12px" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>S/No</th>
                  <th style={{ textAlign: "start" }}>Quantity</th>
                  <th style={{ textAlign: "start" }}>Product Name</th>
                  <th style={{ textAlign: "start" }}>Rate</th>
                  <th style={{ textAlign: "center" }}>Gross Amount</th>
                  <th style={{ textAlign: "center" }}>Remove</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td style={{ textAlign: "center" }}>{index + 1}</td>
                    <td>
                      <TextInput
                        size="xs"
                        type="number"
                        value={row.qty}
                        onChange={(e) =>
                          handleChange(index, "qty", Number(e.currentTarget.value))
                        }
                      />
                    </td>
                    <td>
                      <TextInput
                        size="xs"
                        value={row.product}
                        onChange={(e) =>
                          handleChange(index, "product", e.currentTarget.value)
                        }
                      />
                    </td>
                    <td>
                      <TextInput
                        size="xs"
                        type="number"
                        value={row.rate}
                        onChange={(e) =>
                          handleChange(index, "rate", Number(e.currentTarget.value))
                        }
                      />
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {calculateGross(row).toFixed(2)}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <Button size="xs" color="red" onClick={() => removeRow(index)}>
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

           
            <Group justify="end" mt="md" wrap="wrap">
              <Box
                p="md"
                style={{
                  fontSize: "12px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: 8,
                  border: "1px solid #eee",
                  minWidth: 250,
                }}
              >
                <div><strong>Total Amount:</strong> Rs. {totalAmount.toFixed(2)}</div>
                <TextInput
                  size="xs"
                  label="Previous Amount"
                  type="number"
                  value={previousAmount}
                  onChange={(e) => setPreviousAmount(Number(e.currentTarget.value))}
                  mt="xs"
                />
                <div style={{ marginTop: 8 }}>
                  <strong>Grand Total:</strong> Rs. {grandTotal.toFixed(2)}
                </div>
              </Box>
            </Group>
          </Box>
        </Box>

    
        <Group justify="space-between" mt="xl" maw={900} mx="auto" wrap="wrap">
          <Button size="xs" onClick={addRow}>Add Item</Button>
          <Button size="xs">Save Bill</Button>
          <Button size="xs" onClick={() => window.print()}>Print Bill</Button>
        </Group>
      </Stack>
    </Box>
  );
}
